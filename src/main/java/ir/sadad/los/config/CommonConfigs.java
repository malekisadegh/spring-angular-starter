package ir.sadad.los.config;

import lombok.Data;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ToString
@ConfigurationProperties(prefix = "common")
@EnableConfigurationProperties(CommonConfigs.class)
@Component
public class CommonConfigs {


  @Value("${api.services.base.uri}")
  private String servicesBaseURI;
}
