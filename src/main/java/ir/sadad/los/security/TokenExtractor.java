package ir.sadad.los.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

import java.io.IOException;
import java.util.Arrays;

@Controller
public class TokenExtractor {

  public static final String ACCESS_TOKEN = "access_token";

  @RequestMapping(value = "/los", method = RequestMethod.GET)
  public void getAccessToken(@RequestParam("code") String code) throws JsonProcessingException, IOException {
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

    //Get the Access Token From the recieved JSON response
    ObjectMapper mapper = new ObjectMapper();
    JsonNode node = mapper.readTree(response.getBody());
    String token = node.path(ACCESS_TOKEN).asText();

    SecurityContext sc = SecurityContextHolder.getContext();

  }

}
