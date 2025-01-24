module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/app/services/**/*.spec.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
