import mongoose from 'mongoose';
import { ApiResponseError } from '../../../helpers/api-errors';
import Middleware from '../../../middlewares';

const User = mongoose.model('User');
/**
 * Sign up a user, body must contain these fields
 *
 * @param req
 * @param {'POST'} req.method
 * @param {string} req.body.name
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} req.body.organization
 * @param res
 * @returns {Promise<void>}
 */
async function SignUpHandler({ req, res }) {
  if (req.method === 'POST') {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      const errorResponse = ApiResponseError.getError({
        name: 'ForbiddenError',
        message: `${req.body.email} already taken, try another email.`
      });
      return res.json(errorResponse);
    }
    const user = new User({ ...req.body, password: { value: req.body.password } });
    await user.save();
    // setUserSession(req, user);
    return res.json(user);
  }
}

export default Middleware(SignUpHandler);
