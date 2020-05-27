package ir.sadad.los.integration.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AccessTokenProcessor implements Processor {

  @Override
  public void process(Exchange exchange) throws Exception {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if(authentication !=null){
      System.out.println("test is .............");
    }
  }
}
