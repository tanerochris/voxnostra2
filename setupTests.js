// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { connect, closeDatabase } from './libs/tests/TestDatabase';

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async (done) => {
  await connect();
  done();
});
/**
 * Clear all test data after every test.
 */
// afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async (done) => {
  await closeDatabase();
  done();
});
