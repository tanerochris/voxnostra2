import mongoose from 'mongoose';
import { isAuthenticated } from '../../../helpers/auth-helpers';
import Middleware from '../../../middlewares';
import { ApiResponseError } from '../../../helpers/api-errors';

const Project = mongoose.model('Project');
/**
 * @desc Api handles request to create a new project
 * @param {{ req: NextApiRequest, res: NextApiResponse }} prop
 */
const IndexProjectHandler = async ({ req, res }) => {
  if (req.method === 'POST') {
    // check if user is logged in
    if (!isAuthenticated(req)) {
      const errorResponse = ApiResponseError.getError({
        name: 'AuthorizationError',
        message: 'You must login to create a project.'
      });
      return res.status(errorResponse.errorCode).json(errorResponse);
    }
    req.body.createdBy = req.session.user.id;
    const project = new Project(req.body);
    try {
      // save project
      await project.save();
      return res.json(project.view());
    } catch (error) {
      // handle error
      const errorResponse = ApiResponseError.getError(error);
      return res.status(errorResponse.errorCode).json(errorResponse);
    }
  }
  return null;
};

export default Middleware(IndexProjectHandler);
