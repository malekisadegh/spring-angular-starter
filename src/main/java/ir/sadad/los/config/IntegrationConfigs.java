package ir.sadad.los.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties("spring")
@Getter
@Setter
public class IntegrationConfigs {


  private String authorization;

  private String clientId;

  private String clientSecret;

  private String bmiProvider;
}
