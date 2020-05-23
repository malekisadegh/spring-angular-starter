package ir.sadad.los.config;

import ir.sadad.los.filter.SpringOAuth2Filter;
import ir.sadad.los.security.CustomRequestEntityConverter;
import ir.sadad.los.security.CustomTokenResponseConverter;
import ir.sadad.los.security.CustomizeAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Base64;

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(SecurityConfigs.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  CustomizeAuthenticationSuccessHandler successHandler;


  private final SecurityConfigs securityConfigs;

  public SecurityConfiguration(SecurityConfigs configs) {
    this.securityConfigs = configs;
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {

    HeaderWriter headerWriter = new StaticHeadersWriter(HttpHeaders.AUTHORIZATION, "Basic", Base64.getEncoder().encodeToString(("los-ui-client" + ":" + "bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1").getBytes()));


    http
      .csrf()
      .disable()
      .cors()
      .and()
      //.antMatcher("/**")
      .authorizeRequests()
      .antMatchers("/los").permitAll()
      .antMatchers("/test").hasAuthority("ROLE_CLIENT")
      .anyRequest()
      .authenticated()
      .and()
      .headers()
      // .addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))
      .addHeaderWriter(headerWriter)
      .and()
      //.addFilterAfter(new SpringOAuth2Filter(),SecurityContextPersistenceFilter.class)
      .logout().deleteCookies("JSESSIONID")
      //.and()
      //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .oauth2Login()
      .successHandler(successHandler)
      .authorizationEndpoint()
      .authorizationRequestResolver(new CustomAuthorizationRequestResolver(clientRegistrationRepository(), "/oauth2/authorization"))
      .authorizationRequestRepository(authorizationRequestRepository());

  }

  @Bean
  public ClientRegistrationRepository clientRegistrationRepository() {
    return new InMemoryClientRegistrationRepository(getRegistration());
  }

  @Bean
  public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
    return new HttpSessionOAuth2AuthorizationRequestRepository();
  }


  private ClientRegistration getRegistration() {
    return ClientRegistration.withRegistrationId("sso")
      .clientId(securityConfigs.getClientId())
      .clientSecret(securityConfigs.getClientSecret())
      .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .redirectUriTemplate(securityConfigs.getRedirectUri())
      .scope(securityConfigs.getClientScope())
      .authorizationUri(securityConfigs.getAuthorizationUri())
      .userInfoUri(securityConfigs.getUserInfoEndpoint())
      .tokenUri(securityConfigs.getTokenUri())
      .clientName(securityConfigs.getClientName())
      .build();
  }

  @Bean
  public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
    DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
    accessTokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter());

    OAuth2AccessTokenResponseHttpMessageConverter tokenResponseHttpMessageConverter = new OAuth2AccessTokenResponseHttpMessageConverter();
    tokenResponseHttpMessageConverter.setTokenResponseConverter(new CustomTokenResponseConverter());
    RestTemplate restTemplate = new RestTemplate(Arrays.asList(new FormHttpMessageConverter(), tokenResponseHttpMessageConverter));
    restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());
    accessTokenResponseClient.setRestOperations(restTemplate);
    return accessTokenResponseClient;
  }

}

