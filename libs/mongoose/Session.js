import { session, withSession, Store, MemoryStore } from 'next-session';
import connectMongo from 'connect-mongo';
import PropertiesReader from 'properties-reader';
import { HttpHandler } from '../../interfaces/handlers';

const MongoStore = connectMongo({Store, MemoryStore});
const properties = PropertiesReader('voxnostra.properties');
const mongoDbProp = 'project.app.mongodb.devUrl';        
const mongooseUrl = process.env.MONGOB_URL || properties.get(mongoDbProp);

const Session = async ({req, res}) => {
    session({
        store: new MongoStore({ url: mongooseUrl }),
    });
    return {req, res};
};

export default Session;