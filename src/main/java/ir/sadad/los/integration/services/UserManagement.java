package ir.sadad.los.integration.services;

import ir.sadad.los.config.CommonConfigs;
import ir.sadad.los.integration.processors.AccessTokenProcessor;
import org.apache.camel.CamelContext;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserManagement extends RouteBuilder {

  @Autowired
  private AccessTokenProcessor accessTokenProcessor;


  @Autowired
  private CommonConfigs commonConfigs;


  @Override
  public void configure() throws Exception {

    CamelContext context = new DefaultCamelContext();

    restConfiguration()
      .contextPath("/services")
      .port("8080")
      .enableCORS(true)
      .component("servlet")
      .bindingMode(RestBindingMode.json);

    from("servlet:///?matchOnUriPrefix=true")
      .routeId("proxy-route")
      .process(accessTokenProcessor)
      .toD(commonConfigs.getServicesBaseURI() + "/?bridgeEndpoint=true")
      .to("log:DEBUG?showBody=true&showHeaders=true");

  }
}
