import mongoose, { connect } from 'mongoose';
import path from 'path';
import PropertiesReader from 'properties-reader';

const properties = PropertiesReader(path.resolve('voxnostra.properties'));
const mongoDbProp = 'project.app.mongodb.devUrl';
const mongooseUrl = process.env.MONGOB_URL || properties.get(mongoDbProp);
const Database = async ({ req, res }) => {
  if (!mongoose.connection) {
    req.database = mongoose.connection;
    return { req, res };
  }
  await connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  req.database = mongoose.connection;
  return { req, res };
};

export default Database;
