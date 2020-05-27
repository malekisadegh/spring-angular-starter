package ir.sadad.los.integration.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.http.common.HttpOperationFailedException;
import org.springframework.stereotype.Component;

@Component
public class ExceptionHandlerProcessor implements Processor {

    @Override
    public void process(Exchange exchange) throws Exception {
        // e won't be null because we only catch HttpOperationFailedException;
        // otherwise, we'd need to check for null.
        final HttpOperationFailedException e =
                exchange.getProperty(Exchange.EXCEPTION_CAUGHT, HttpOperationFailedException.class);
        exchange.getIn().setBody(e.getResponseBody());
        exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE,e.getStatusCode());
    }
}
