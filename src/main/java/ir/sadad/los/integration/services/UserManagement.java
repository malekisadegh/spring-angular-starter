package ir.sadad.los.integration.services;

import ir.sadad.los.integration.processors.AccessTokenProcessor;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserManagement extends RouteBuilder {

  @Autowired
  private AccessTokenProcessor accessTokenProcessor;


  @Override
    public void configure() throws Exception {

      from("direct:start")
        .process(accessTokenProcessor)
        .to("log:bar");

    from("restlet:/search")
      .removeHeaders("CamelHttp*", "CamelHttpMethod")
      .setHeader(Exchange.HTTP_METHOD, constant("GET"))
      .setHeader(Exchange.HTTP_PATH, simple("/search"))
/*      .setHeader(Exchange.HTTP_QUERY, simple("title=${header.title}&limit=${header.limit}&offset=${header.offset}" +
        "&sort.sorted=${header.sort.sorted}&sort.unsorted=${header.sort.unsorted}&isActive=${header.isActive}"))*/
      .process(new Processor() {

        @Override
        public void process(Exchange exchange) throws Exception {
          System.out.println("test is .............");
        }
      })
      .to("direct:ExecuteRequest");
    }
}
