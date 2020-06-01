import moment from 'moment';
import { AuthorizationError, ErrorResponse, ValidationError } from '../../../helpers/api-errors';
import { setUserSession } from '../../../helpers/auth-helpers';
import Middleware from '../../../middlewares';
import UserModel from '../../../models/user/user.model';

/**
 * Logs in, set user information on session object
 *
 * @param req
 * @param {'POST'} req.method
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param res
 * @returns {Promise<void>}
 */
async function SignInHandler({ req, res }) {
  if (req.method === 'POST') {
    const details = {};
    const userWithPassword = await UserModel.getUserQuery(req.body.email).select('password').exec();

    if (userWithPassword) {
      const { password } = userWithPassword;

      if (password) {
        // check if the account is currently locked
        if (password.isLocked()) {
          throw new AuthorizationError(`Account Locked, Try again ${moment(password.lockUntil).toNow()}.`);
        }

        const correct = await password.comparePassword(req.body.password);

        if (correct) {
          if (password.loginAttempts > 0 || password.lockUntil > 1) {
            await password.resetPasswordLock();
          }

          setUserSession(req, await UserModel.getUserQuery(req.body.email).exec());

          return res.json(req.session.user);
        }
        details.password = 'Incorrect Password';

        await password.incLoginAttempts();
      } else {
        throw new ErrorResponse('Authentication Failed.', { email: 'User information mismatch' });
      }
    } else {
      details.username = `Unknown Username or Email, ${req.body.email}`;
    }

    throw new ValidationError(details, 'Authentication Failed!!');
  }
}

export default Middleware(SignInHandler);
