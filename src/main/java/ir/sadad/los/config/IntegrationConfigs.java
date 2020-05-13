package ir.sadad.los.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;
import lombok.ToString;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@ToString
@ConfigurationProperties(prefix = "oauth2")
public class IntegrationConfigs {


  @Value("${client.secret:}")
  private String clientSecret;

  @Value("${client.id:}")
  private String clientId;

  @Value("${client.name:}")
  private String clientName;

  @Value("${client.scope:}")
  private String clientScope;

  @Value("${client.redirectUri:}")
  private String redirectUri;

  @Value("${client.authenticationMethod:}")
  private String authenticationMethod;

  @Value("${client.grantType:}")
  private String grantType;

  @Value("${provide.tokenUri:}")
  private String tokenUri;

  @Value("${provider.authorizationUri:}")
  private String authorizationUri;

  @Value("${secretKeyLocation:}")
  private String secretKeyLocation;


}
