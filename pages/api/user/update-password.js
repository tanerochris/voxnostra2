import { ErrorResponse, ValidationError } from '../../../helpers/api-errors';
import Middleware from '../../../middlewares';
import User from '../../../models/user/user.model';

/**
 * POST
 * Update a user's password. There must be an active session to get user from
 *
 * @param req
 * @param {string} req.body.curPassword
 * @param {string} req.body.newPassword
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function UpdatePasswordHandler({ req, res }) {
  if (req.method === 'POST') {
    const message = 'Password Update Unsuccessful.';

    const userWithPassword = await User.findById(req.session.user && req.session.user.id)
      .select('password')
      .exec();

    if (!userWithPassword) {
      throw new ErrorResponse('User information missing');
    }

    if (!(await userWithPassword.password.comparePassword(req.body.curPassword))) {
      await userWithPassword.password.incLoginAttempts();
      throw new ValidationError({
        curPassword: 'Password incorrect, verify and try again.',
        message
      });
    }

    await userWithPassword.password.resetPassword({
      password: req.body.newPassword,
      strategy: 'manual'
    });

    res.statusCode = 204;
    return res.end();
  }
}

export default Middleware(UpdatePasswordHandler);
