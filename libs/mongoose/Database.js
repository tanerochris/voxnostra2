import mongoose, { connect } from 'mongoose';
import path from 'path';
import PropertiesReader from 'properties-reader';

const properties = PropertiesReader(path.resolve('voxnostra.properties'));
const mongoDbProp = 'project.app.mongodb.devUrl';
const mongooseUrl = process.env.MONGOB_URL || properties.get(mongoDbProp);

let isFirst = true;

const Database = async ({ req, res }) => {
  if (isFirst) {
    await connect(mongooseUrl,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    isFirst = false;
    // fixme: here we log connection errors and retries
    // eslint-disable-next-line no-console
    mongoose.connection.on('error', (error) => console.error(error));
  }

  req.database = mongoose.connection;
  return { req, res };
};

export default Database;
