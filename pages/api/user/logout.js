import Middleware from '../../../middlewares';

/**
 * Sets the session value to null. Logout User
 *
 * @param req
 * @param {'GET'} req.method
 * @param res
 * @returns {Promise<void>}
 */
async function LogoutHandler({ req, res }) {
  if (req.method === 'GET') {
    req.session.destroy();

    res.statusCode = 204;
    res.end();
  }
}

export default Middleware(LogoutHandler);
