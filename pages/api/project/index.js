import mongoose from 'mongoose';
import Middleware from '../../../middlewares';
import { ApiResponseError } from '../../../libs/api-errors';

const Project = mongoose.model('Project');

const IndexProjectHandler = async ({ req, res }) => {
  const { method, body, session } = req;
  if (method === 'POST') {
    // check if user is logged in
    if (session && !session.user) {
      const errorResponse = ApiResponseError.getError({
        name: 'AuthorizationError',
        message: 'You must login to create a project.'
      });
      return res.json(errorResponse);
    }
    body.createdBy = session.user.id;
    const project = new Project(body);
    try {
      await project.save();
      return res.json(project.view());
    } catch (error) {
      const errorResponse = ApiResponseError.getError(error);
      return res.json(errorResponse);
    }
  }
  return null;
};

export default Middleware(IndexProjectHandler);
