import { ValidationError } from '../../../helpers/api-errors';
import Middleware from '../../../middlewares';
import User from '../../../models/user/user.model';

/**
 * Request a password reset, user may not be having a session with device.
 *
 * @param req
 * @param {'POST'} req.method
 * @param {string} req.body.email
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function UserPasswordResetHandler({ req, res }) {
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

export default Middleware(UserPasswordResetHandler);
