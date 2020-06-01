import { ValidationError } from '../../../helpers/api-errors';
import { setUserSession } from '../../../helpers/auth-helpers';
import Middleware from '../../../middlewares';
import User from '../../../models/user/user.model';

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
