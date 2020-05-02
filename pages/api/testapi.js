import Middleware from '../../middlewares';
import User from '../../schemas/user.model';

const handler = async ({ req, res }) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const user = new User({ name: 'leopoldo' });
  await user.save();
  res.end(JSON.stringify({ name: 'leopold' }));
};

export default Middleware(handler);
