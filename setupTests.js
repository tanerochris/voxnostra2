/* eslint-disable global-require */

// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-unfetch';
import glob from 'glob';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer({ debug: true });
const models = glob.sync('models/**/*.model.js', {});
models.forEach((modelFilePath) => require(`./${modelFilePath}`));

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
  await mongoServer.getConnectionString();
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

/**
 * Remove all the data for all db collections.
 */
/* const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  Object.values(collections).forEach((collection) => collection.deleteMany());
}; */

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async (done) => {
  // Add assetPrefix support based on the hostname
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
