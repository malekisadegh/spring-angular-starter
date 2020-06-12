package ir.sadad.los.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.sadad.los.config.SecurityConfigs;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
@RestController
public class TokenReceptor {

  private static final String ACCESS_TOKEN = "access_token";
  private static final String GRANT_TYPE = "authorization_code";

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private SecurityConfigs securityConfigs;

  @Bean
  public OAuth2AuthenticationManager oAuth2AuthenticationManager() {
    return new OAuth2AuthenticationManager();
  }

  private TokenExtractor tokenExtractor = new TokenExtractor();


  @RequestMapping(value = "/code", method = RequestMethod.GET)
  public void getAccessToken(@RequestParam("code") String code, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {

    ResponseEntity<String> response = null;

    RestTemplate restTemplate = new RestTemplate();

    String credentials = securityConfigs.getClientId() + ":" + securityConfigs.getClientSecret(); //"los-ui-client:bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1";
    String encodedCredentials = new String(Base64.encodeBase64(credentials.getBytes()));

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.add("Authorization", "Basic " + encodedCredentials);

    HttpEntity<String> request = new HttpEntity<String>(headers);

    String access_token_url = securityConfigs.getTokenUri();
    access_token_url += "?code=" + code;
    access_token_url += "&client_id=" + securityConfigs.getClientId();
    access_token_url += "&redirect_uri=" + securityConfigs.getRedirectUri();
    access_token_url += "&scope=" + securityConfigs.getClientScope();
    access_token_url += "&grant_type=" + GRANT_TYPE;

    response = restTemplate.exchange(access_token_url, HttpMethod.POST, request, String.class);

    ObjectMapper mapper = new ObjectMapper();
    JsonNode node = mapper.readTree(response.getBody());
    String token = node.path(ACCESS_TOKEN).asText();

    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = tokenExtractor.crateAuthentication(token);
    Authentication authResult = authenticationManager.authenticate(authentication);
    securityContext.setAuthentication(authResult);

    //HttpSession session = httpServletRequest.getSession(true);
    ///session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

    httpServletResponse.sendRedirect("/portal/home");

  }

  @RequestMapping(value = "/userInfo", method = RequestMethod.GET)
  public void getUserInfo(@RequestParam("ssn") String ssn, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {

    ResponseEntity<String> response = null;
    String accessToken = null;

    RestTemplate restTemplate = new RestTemplate();

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      accessToken = ((BmiOAuth2User) ((OAuth2AuthenticationToken) authentication).getPrincipal()).getToken();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.add("Authorization", "Bearer " + accessToken);

    HttpEntity<String> request = new HttpEntity<String>(headers);

    String user_info_uri = securityConfigs.getUserInfoEndpoint();
    user_info_uri += "?claims=" + "user_info";
    user_info_uri += "&nationalIds=" + ssn;

    response = restTemplate.exchange(user_info_uri, HttpMethod.GET, request, String.class);

    ObjectMapper mapper = new ObjectMapper();
    JsonNode node = mapper.readTree(response.getBody());

  }

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  public String getTestInfo(@RequestParam("ssn") String ssn, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    return ssn;
  }

  @RequestMapping(value = "/post2", method = RequestMethod.POST)
  public String getTest2(@RequestBody TestDto testDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    return testDto.getName();
  }

  @RequestMapping(value = "/put2", method = RequestMethod.PUT)
  public String getTest4(@RequestBody TestDto testDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    return testDto.getName();
  }

  @RequestMapping(value = "/delete2", method = RequestMethod.DELETE)
  public String getTest3(@RequestParam("ssn") String ssn, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    return ssn;
  }
}
