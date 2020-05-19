import Middleware from '../../middlewares';
import UserModel from '../../schemas/user/user.model';

const TestHandler = async ({ res }) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const user = new UserModel({ name: 'leopoldo' });
  await user.save();
  res.end(JSON.stringify({ name: 'leopold' }));
};

export default Middleware(TestHandler);
