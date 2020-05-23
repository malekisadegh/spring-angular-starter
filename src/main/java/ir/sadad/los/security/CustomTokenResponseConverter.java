package ir.sadad.los.security;

import ir.sadad.los.config.SecurityConfigs;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CustomTokenResponseConverter implements Converter<Map<String, String>, OAuth2AccessTokenResponse> {

  /*private SecurityConfigs configs;*/

  /*public CustomTokenResponseConverter(SecurityConfigs configs) {
    this.securityConfigs = configs;
  }*/

  private static final Set<String> TOKEN_RESPONSE_PARAMETER_NAMES = Stream.of(
    OAuth2ParameterNames.ACCESS_TOKEN,
    OAuth2ParameterNames.TOKEN_TYPE,
    OAuth2ParameterNames.EXPIRES_IN,
    OAuth2ParameterNames.REFRESH_TOKEN,
    OAuth2ParameterNames.SCOPE).collect(Collectors.toSet());

  @Override
  public OAuth2AccessTokenResponse convert(Map<String, String> tokenResponseParameters) {

    String accessToken = tokenResponseParameters.get(OAuth2ParameterNames.ACCESS_TOKEN);
    long expiresIn = Long.valueOf(tokenResponseParameters.get(OAuth2ParameterNames.EXPIRES_IN));

    OAuth2AccessToken.TokenType accessTokenType = OAuth2AccessToken.TokenType.BEARER;

    Set<String> scopes = Collections.emptySet();
    if (tokenResponseParameters.containsKey(OAuth2ParameterNames.SCOPE)) {
      String scope = tokenResponseParameters.get(OAuth2ParameterNames.SCOPE);
      scopes = Arrays.stream(StringUtils.delimitedListToStringArray(scope, ","))
        .collect(Collectors.toSet());
    }

    return OAuth2AccessTokenResponse.withToken(accessToken)
      .tokenType(accessTokenType)
      .expiresIn(expiresIn)
      .scopes(scopes)
      //.refreshToken(refreshToken)
      //.additionalParameters(additionalParameters)
      .build();
  }

}
