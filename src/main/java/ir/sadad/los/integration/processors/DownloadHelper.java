package ir.sadad.los.integration.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class DownloadHelper implements Processor {

    @Override
    public void process(Exchange exchange) throws Exception {
        InputStream inputStream = (InputStream) exchange.getIn().getBody();
        try {
            exchange.getOut().setBody(inputStream);
            exchange.getOut().setHeader("Content-Type", "application/octet-stream");
        } catch (Exception e) {
            throw e;
        }

    }
}
