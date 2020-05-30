package ir.sadad.los.integration.processors;

import ir.sadad.los.security.BmiOAuth2User;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class AccessTokenProcessor implements Processor {

  @Override
  public void process(Exchange exchange) throws Exception {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      String accessToken = ((BmiOAuth2User) ((OAuth2AuthenticationToken) authentication).getPrincipal()).getToken();
      exchange.getIn().setHeader("Authorization", "Bearer " + accessToken);
    }
  }
}
