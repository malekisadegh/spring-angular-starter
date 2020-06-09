package ir.sadad.los.integration.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class RestHelper implements Processor {
    private static final String CamelHttpQuery = "CamelHttpQuery";

    @Override
    public void process(Exchange exchange) throws Exception {
        Map<String, Object> map = exchange.getIn().getHeaders();
        Object camelHttpQuery = map.get(CamelHttpQuery);
        String queryString;
        if (camelHttpQuery != null) {
            queryString = camelHttpQuery.toString();
            String[] queries = queryString.split("&");
            queryString = StringUtils.EMPTY;
            for (String query : queries) {
                String[] keyValue = query.split("=");
                if (keyValue.length == 2) {
                    if (StringUtils.isNotEmpty(queryString)) {
                        queryString += "&";
                    }
                    String Temp = keyValue[1].replace("[", "").replace("]", "");
                    String[] tempArr = Temp.split(",");
                    if (tempArr.length > 0) {

                        for (String str : tempArr) {
                            if (StringUtils.isNotEmpty(queryString)) {
                                queryString += "&";
                                queryString = queryString.replace("&&", "&");
                            }
                            queryString += String.format("%s=%s", keyValue[0], str);
                        }
                    } else {
                        queryString += query;
                    }
                }
            }
            map.remove(CamelHttpQuery);
            if (StringUtils.isNotEmpty(queryString)) {
                map.put(CamelHttpQuery, queryString);
            }
        }

    }


}
