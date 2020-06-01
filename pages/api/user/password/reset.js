import {
  ValidationError,
  verifyResetToken
} from '../../../../libs';
import Middleware from '../../../../middlewares';
import User from '../../../../schemas/user/user.model';

/**
 * Get the reset token from body as well as new password and reset password
 *
 * @param req
 * @param {'POST'} req.method
 * @param {string} req.body.reset_token Token gotten from forgot password call
 * @param {string} req.body.password
 * @param {string} req.body.confirm_password
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
async function ResetPasswordHandler({ req, res }) {
  if (req.method === 'POST') {
    const message = 'Password reset unsuccessful.';
    const details = {};

    if (req.body.password !== req.body.confirm_password) {
      throw new ValidationError({
        password: 'Must match confirm password',
        confirm_password: 'Must match new password'
      }, message);
    }

    const response = (await verifyResetToken(req.body.reset_token));

    if (response.payload) {
      const userWithPassword = await User.findById(response.payload.uid).select('password').exec();

      if (userWithPassword && userWithPassword.password.validateResetToken(req.body.reset_token)) {
        await userWithPassword.password.resetPassword({
          password: req.body.password,
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
