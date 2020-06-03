import moment from 'moment';
import mongoose from 'mongoose';
import { ApiResponseError } from '../../../helpers/api-errors';
import { setUserSession } from '../../../helpers/auth-helpers';
import Middleware from '../../../middlewares';

const User = mongoose.model('User');

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
  let errorResponse = '';
  if (req.method === 'POST') {
    const userWithPassword = await User.getUserQuery(req.body.email).select('password').exec();

    if (userWithPassword) {
      const { password } = userWithPassword;

      if (password) {
        // check if the account is currently locked
        if (password.isLocked()) {
          errorResponse = ApiResponseError.getError({
            name: 'AuthorizationError',
            message: `Account Locked, Try again ${moment(password.lockUntil).toNow()}.`
          });
          return res.json(errorResponse);
        }

        const correct = await password.comparePassword(req.body.password);

        if (correct) {
          if (password.loginAttempts > 0 || password.lockUntil > 1) {
            await password.resetPasswordLock();
          }
          setUserSession(req, await User.getUserQuery(req.body.email).exec());
          return res.json(req.session.user);
        }
        await password.incLoginAttempts();
        errorResponse = ApiResponseError.getError({ name: 'AuthorizationError', message: `Incorrect Password` });
        return res.json(errorResponse);
      }
      errorResponse = ApiResponseError.getError({ name: 'AuthorizationError', message: 'User information mismatch' });
      return res.json(errorResponse);
    }
    errorResponse = ApiResponseError.getError({
      name: 'AuthorizationError',
      message: `Unknown Username or Email, ${req.body.email}`
    });
    return res.json(errorResponse);
  }
  return null;
}

export default Middleware(SignInHandler);
