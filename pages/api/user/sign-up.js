import { ValidationError } from '../../../libs/api-errors';
import { setUserSession } from '../../../libs/auth-helpers';
import Middleware from '../../../middlewares';
import User from '../../../schemas/user/user.model';

/**
 * POST only
 * Sign up a user, body must contain these two fields
 *
 * @param req
 * @param req.body.email
 * @param req.body.password
 * @param res
 * @returns {Promise<void>}
 */
async function SignUpHandler({ req, res }) {
  if (req.method === 'POST') {
    if ((await User.find({ email: req.body.email }).exec()).length > 0) {
      throw new ValidationError(
        {
          email: `${req.body.email} already taken, try another email.`
        },
        'Could not create account.'
      );
    }

    const user = new User({ ...req.body, password: { value: req.body.password } });

    await user.save();

    setUserSession(req, user);

    res.json(req.session.user);
  }
}

export default Middleware(SignUpHandler);
