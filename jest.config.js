// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  coverageDirectory: 'reports',
  setupFilesAfterEnv: ['<rootDir>/src/main/webapp/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/main/webapp/app/$1',
    '@core': ['<rootDir>/src/main/webapp/app/@core'],
    '@core/(.*)': ['<rootDir>/src/main/webapp/app/@core/$1'],
    '@shared': ['<rootDir>/src/main/webapp/app/@shared'],
    '@shared/(.*)': ['<rootDir>/src/main/webapp/app/@shared/$1'],
    '@env': '<rootDir>/src/main/webapp/environments/environment',
  },
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  // Do not ignore librairies such as ionic, ionic-native or bootstrap to transform them during unit testing.
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ng-bootstrap))'],
};
