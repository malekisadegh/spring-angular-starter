package ir.sadad.los.integration.services;

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


  @Override
    public void configure() throws Exception {

    CamelContext context = new DefaultCamelContext();

    restConfiguration()
      .contextPath("/services")
      .port("8080")
      .enableCORS(true)
      .component("servlet")
      .bindingMode(RestBindingMode.json);

    /*for test call http://localhost:8080/rest/api/bean*/
    rest("/api/")
      .id("api-route")
      .consumes("application/json")
      .get("/bean")
      .bindingMode(RestBindingMode.json_xml)
      .to("direct:remoteService");

    from("direct:remoteService")
      .routeId("direct-route")
      .tracing()
      .process(accessTokenProcessor)
      .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(200));


    }
}
