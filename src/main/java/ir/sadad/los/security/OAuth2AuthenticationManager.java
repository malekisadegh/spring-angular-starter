package ir.sadad.los.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import ir.bmi.identity.security.model.dto.AccessTokenDto;
import ir.sadad.los.exception.BmiAuthenticationException;
import ir.sadad.los.exception.NoTokenOrInvalidTokenProvidedException;
import ir.bmi.identity.security.config.ModelKey;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationManager implements AuthenticationManager {

  private BmiOAuth2User oAuth2User;


  @SneakyThrows
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {

    if (authentication == null) {
      throw new NoTokenOrInvalidTokenProvidedException();
    }

    if (hasAnonymousRole(authentication)) {
      return anonymousAuthentication(authentication);
    }

    BmiOAuth2User userDetails = oAuth2User;
    final String oAuth2FilterException = (String) (userDetails).getAttributes().get("OAuth2FilterException");
    if (oAuth2FilterException != null && !oAuth2FilterException.isEmpty()) {
      throw new BmiAuthenticationException(oAuth2FilterException);
    }

    final String clientId = (String) (userDetails).getAttributes().get(ModelKey.CLIENT_ID.toLowerCase());
    OAuth2AuthenticationToken authenticationToken = new OAuth2AuthenticationToken(userDetails, userDetails.getAuthorities(), clientId);
    authenticationToken.setDetails(userDetails);
    return authenticationToken;
  }

  private Authentication anonymousAuthentication(Authentication authentication) {
    List<SimpleGrantedAuthority> roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ANONYMOUS"));
    Object principal = authentication.getPrincipal();
    String key = UUID.randomUUID().toString();
    return new AnonymousAuthenticationToken(key, principal, roles);
  }

  private boolean hasAnonymousRole(Authentication authentication) throws JsonProcessingException {
    if (authentication instanceof PreAuthenticatedAuthenticationToken) {
      String details = decodeToken((String) authentication.getPrincipal());
      oAuth2User = convert(details);
      return oAuth2User.getAuthorities().contains("ROLE_ANONYMOUS");
    }
    return false;
  }

  private BmiOAuth2User convert(String str) throws JsonProcessingException {
    HashMap<String, Object> result = new ObjectMapper().readValue(str, HashMap.class);
    return new  BmiOAuth2User(result);
  }

  private String decodeToken(String jwtToken) {
    String TOKEN_DELIMITER = "\\.";
    String[] split_string = jwtToken.split(TOKEN_DELIMITER);
    String base64EncodedHeader = split_string[0];
    String base64EncodedBody = split_string[1];
    String base64EncodedSignature = split_string[2];
    Base64 base64Url = new Base64(true);
    String header = new String(base64Url.decode(base64EncodedHeader));
    String body = new String(base64Url.decode(base64EncodedBody));
    return body;
  }

}
