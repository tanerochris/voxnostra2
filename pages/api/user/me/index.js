import {
  AuthorizationError,
  isAuthenticated,
  setUserSession
} from '../../../../libs';
import Middleware from '../../../../middlewares';
import UserModel from '../../../../schemas/user/user.model';

/**
 * Get current user, also resets the current user on the session object, (update)
 *
 * @param req
 * @param {'GET'} req.method
 * @param res
 * @returns {Promise<void>}
 */
async function UserMeHandler({ req, res }) {
  if (req.method === 'GET') {
    if (isAuthenticated(req, true)) {
      const user = await UserModel.findById(req.session.user.id).exec();

      if (!user) {
        req.session.user = undefined;

        throw new AuthorizationError('User not found');
      }

      setUserSession(req, user);

      res.json(user);
    }
  }
}

export default Middleware(UserMeHandler);
