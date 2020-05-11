import { ValidationError } from '../../../libs/api-errors';
import { verifyResetToken } from '../../../libs/auth-helpers';
import Middleware from '../../../middlewares';
import User from '../../../schemas/user/user.model';

/**
 * POST
 * Get the reset token from body as well as new password and reset password
 *
 * @param req
 * @param {string} req.body.resetToken
 * @param {string} req.body.newPassword
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function ResetPasswordHandler({ req, res }) {
  if (req.method === 'POST') {
    const response = (await verifyResetToken(req.body.resetToken));

    const message = 'Password reset unsuccessful.';
    const details = {};

    if (response.payload) {
      const userWithPassword = await User.findById(response.payload.uid).select('password').exec();

      if (userWithPassword && userWithPassword.password.validateResetToken(req.body.resetToken)) {
        await userWithPassword.password.resetPassword({
          password: req.body.newPassword,
          strategy: response.payload.strategy
        });

        res.statusCode = 204;
        return res.end();
      }
    }

    details.resetToken = 'Token is Invalid, request a new reset Token.';

    throw new ValidationError(details, message);
  }
}

export default Middleware(ResetPasswordHandler);
