export const environment = {
  production: false,
  hmr: false,
  version: '0.0.1' + '-dev',
  serverUrl: 'http://localhost:3004/',
  defaultLanguage: 'fa-IR',
  supportedLanguages: ['fa-IR', 'en-US'],
  oath: {
    grantType: 'authorization_code',
    redirectUri: 'http://localhost:8080/los',
    clientId: 'los-ui-client',
    accessTokenUri: 'http://185.135.30.10:9443/identity/oauth2/auth/token',
    authorizationUri: 'http://185.135.30.10:9443/identity/oauth2/auth/authorize',
    clientSecret: 'bK4cF1cJ5lF6nH7kG6iI5mN5gL1vB3dP1jF4jC1qB1',
    scope: 'svc-mgmt-indv-lgl-foreign-cust-info',
  },
};

/*

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
