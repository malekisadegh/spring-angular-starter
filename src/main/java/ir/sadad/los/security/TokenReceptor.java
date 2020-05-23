package ir.sadad.los.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Controller
public class TokenReceptor {

  private static final String ACCESS_TOKEN = "access_token";
  @Autowired
  private AuthenticationManager authenticationManager;

  @Bean
  public OAuth2AuthenticationManager oAuth2AuthenticationManager() {
    return new OAuth2AuthenticationManager();
  }

  private TokenExtractor tokenExtractor = new TokenExtractor();


  @RequestMapping(value = "/los", method = RequestMethod.GET)
  public void getAccessToken(@RequestParam("code") String code, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
    ResponseEntity<String> response = null;

    RestTemplate restTemplate = new RestTemplate();

    String credentials = "los-ui-client:bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1";
    String encodedCredentials = new String(Base64.encodeBase64(credentials.getBytes()));

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.add("Authorization", "Basic " + encodedCredentials);

    HttpEntity<String> request = new HttpEntity<String>(headers);

    String access_token_url = "http://185.135.30.10:9443/identity/oauth2/auth/token";
    access_token_url += "?code=" + code;
    access_token_url += "&client_id=los-ui-client";
    access_token_url += "&redirect_uri=http://localhost:8080/los";
    access_token_url += "&scope=svc-mgmt-indv-lgl-foreign-cust-info";
    access_token_url += "&grant_type=authorization_code";

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

    httpServletResponse.sendRedirect("/test");

  }

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  public Object securityTest(HttpServletRequest httpServletRequest) throws IOException {
    HttpSession session = httpServletRequest.getSession(true);
       return session;
  }

}
