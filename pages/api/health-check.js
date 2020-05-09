import Middleware from '../../middlewares';

const HealthCheckHandler = async ({ req, res }) => {
  res.send(`All Good, Thanks for checking in - @${(req.session.user && req.session.user.name) || 'MrAnonymous'}.`);
};

export default Middleware(HealthCheckHandler);
