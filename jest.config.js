module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/libs/jest/cssTransform.js'
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'json'],
  roots: ['<rootDir>/__tests__'],
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node'
};
