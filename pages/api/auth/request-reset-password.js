import { ValidationError } from '../../../libs/api-errors';
import Middleware from '../../../middlewares';
import User from '../../../schemas/user/user.model';

/**
 * POST
 * Request a password reset, user should not be having a session with device.
 *
 * @param req
 * @param {string} req.body.email
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function RequestResetPasswordHandler({ req, res }) {
  if (req.method === 'POST') {
    const userWithPassword = await User.getUserQuery(req.body.email, 'password').exec();

    if (!userWithPassword) {
      throw new ValidationError({
        email: 'No account matches this email.'
      });
    }

    const resetToken = await userWithPassword.password.generatePasswordResetToken('email');

    // todo: email it, based on strategy, create event, for now return it...

    return res.json({ resetToken });
  }
}

export default Middleware(RequestResetPasswordHandler);
