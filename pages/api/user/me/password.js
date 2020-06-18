import { ErrorResponse, ValidationError } from '../../../../helpers/api-errors';
import Middleware from '../../../../middlewares';
import User from '../../../../models/user/user.model';

/**
 * Update current user's password
 *
 * @param req
 * @param {'PUT'} req.method
 * @param {string} req.body.old_password
 * @param {string} req.body.password
 * @param {string} req.body.confirm_password
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function UpdatePasswordHandler({ req, res }) {
  if (req.method === 'PUT') {
    const message = 'Password Update Unsuccessful.';

    const userWithPassword = await User.findById(req.session.user && req.session.user.id)
      .select('password')
      .exec();

    if (!userWithPassword) {
      throw new ErrorResponse('User information missing');
    }

    if (!(await userWithPassword.password.comparePassword(req.body.password))) {
      await userWithPassword.password.incLoginAttempts();
      throw new ValidationError({
        curPassword: 'Password incorrect, verify and try again.',
        message
      });
    }

    await userWithPassword.password.resetPassword({
      password: req.body.password,
      strategy: 'manual'
    });

    res.statusCode = 204;
    return res.end();
  }
}

export default Middleware(UpdatePasswordHandler);
