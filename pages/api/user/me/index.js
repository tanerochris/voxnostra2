import { AuthorizationError } from '../../../../helpers/api-errors';
import { isAuthenticated, setUserSession } from '../../../../helpers/auth-helpers';

import Middleware from '../../../../middlewares';
import UserModel from '../../../../models/user/user.model';

/**
 * Get current user, also resets the current user on the session object, (update)
 *
 * @param req
 * @param {'GET' | 'PUT'} req.method
 * @param res
 * @returns {Promise<void>}
 */
async function UserMeHandler({ req, res }) {
  if (req.method === 'GET' || req.method === 'PUT') {
    if (isAuthenticated(req, true)) {
      const user = await UserModel.findById(req.session.user.id).exec();

      if (!user) {
        req.session.destroy();

        throw new AuthorizationError('User not found');
      }

      // update current user
      if (req.method === 'PUT') {
        await user.update(req.body);

        setUserSession(req, await UserModel.findById(req.session.user.id).exec());

        res.status(204).end();
      } else {
        setUserSession(req, user);

        res.json(user);
      }
    }
  }
}

export default Middleware(UserMeHandler);
