package ir.sadad.los.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

public class TokenExtractor {

  public static final String BEARER_TYPE = "Bearer";

  public static final String ACCESS_TOKEN = "access_token";

  public static final String ACCESS_TOKEN_VALUE = "ACCESS_TOKEN_VALUE";

  public static final String ACCESS_TOKEN_TYPE = "ACCESS_TOKEN_TYPE";


  public Authentication extract(HttpServletRequest request) {
    String tokenValue = extractToken(request);
    if (tokenValue != null) {
      PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(tokenValue, "");
      final String authenticationException = (String) request.getAttribute("OAuth2FilterException");
      boolean authenticated = authenticationException == null || authenticationException.isEmpty();
      authentication.setAuthenticated(authenticated);
      return authentication;
    }
    return null;
  }

  public Authentication crateAuthentication(String tokenValue) {
    PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(tokenValue, "");
    authentication.setAuthenticated(true);
    return authentication;
  }

  private String extractToken(HttpServletRequest request) {
    String token = extractHeaderToken(request);
    if (token == null) {
      token = request.getParameter(ACCESS_TOKEN);
      if (token == null) {
      } else {
        request.setAttribute(ACCESS_TOKEN_TYPE, BEARER_TYPE);
      }
    }
    return token;
  }

  private String extractHeaderToken(HttpServletRequest request) {
    Enumeration<String> headers = request.getHeaders("Authorization");
    while (headers.hasMoreElements()) { // typically there is only one (most servers enforce that)
      String value = headers.nextElement();
      if ((value.toLowerCase().startsWith(BEARER_TYPE.toLowerCase()))) {
        String authHeaderValue = value.substring(BEARER_TYPE.length()).trim();
        // Add this here for the auth details later. Would be better to change the signature of this method.
        request.setAttribute(ACCESS_TOKEN_TYPE,
          value.substring(0, BEARER_TYPE.length()).trim());
        int commaIndex = authHeaderValue.indexOf(',');
        if (commaIndex > 0) {
          authHeaderValue = authHeaderValue.substring(0, commaIndex);
        }
        return authHeaderValue;
      }
    }

    return null;
  }


}
