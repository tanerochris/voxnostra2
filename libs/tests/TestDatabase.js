import 'isomorphic-unfetch';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer({ debug: true });
/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  const uri = await mongoServer.getConnectionString();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  Object.values(collections).forEach((collection) => collection.deleteMany());
};
