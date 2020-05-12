package ir.sadad.los.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import ir.sadad.los.config.CustomAuthorizationRequestResolver;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


  @Override
  public void configure(HttpSecurity http) throws Exception {

    HeaderWriter headerWriter = new StaticHeadersWriter(HttpHeaders.AUTHORIZATION, "Basic", Base64.getEncoder().encodeToString(("los-ui-client" + ":" + "bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1").getBytes()));


    http
  /*    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()*/
      .antMatcher("/**").authorizeRequests()
      .antMatchers("/", "/login**").permitAll()
      .anyRequest().authenticated()
      .and()
      .headers().addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
      .addHeaderWriter(headerWriter)
      .and()
      .oauth2Login()
      .authorizationEndpoint()
      .authorizationRequestResolver(new CustomAuthorizationRequestResolver(clientRegistrationRepository(), "/oauth2/authorization"));
  }

  @Bean
  public ClientRegistrationRepository clientRegistrationRepository() {
    return new InMemoryClientRegistrationRepository(this.getRegistration());
  }

  private ClientRegistration getRegistration() {
    return ClientRegistration.withRegistrationId("sso")
      .clientId("los-ui-client")
      .clientSecret("bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1")
      .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .redirectUriTemplate("http://localhost:8080/los")
      .scope("svc-mgmt-indv-lgl-foreign-cust-info")
      .authorizationUri("http://185.135.30.10:9443/identity/oauth2/auth/authorize")
      .tokenUri("http://185.135.30.10:9443/identity/oauth2/auth/token")
      .clientName("los-ui-client")
      .build();
  }
}
