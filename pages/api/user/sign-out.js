import Middleware from '../../../middlewares';
/**
 * Sets the session value to null.
 *
 * DELETE endpoint
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function SignOutHandler({ req, res }) {
  if (req.method === 'DELETE') {
    req.session.destroy();

    res.statusCode = 204;
    res.end();
  }
}

export default Middleware(SignOutHandler);
