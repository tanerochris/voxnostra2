import mongoose from 'mongoose';
import Middleware from '../../../middlewares';
import { ApiResponseError } from '../../../libs/api-errors';

const Project = mongoose.model('Project');
const ProjectHandler = async ({ req, res }) => {
  let errorResponse = null;
  const {
    session,
    query,
    body,
    method
  } = req;
  const id = query.project_id;

  try {
    const project = await Project.findById(id);
    if (!project) {
      errorResponse = ApiResponseError.getError({ name: 'NotFoundError', message: `Item with id: ${id} not found.` });
      return res.json(errorResponse);
    }
    if (method === 'GET') {
      return res.json(project.view());
    }
    if (method === 'PUT' || method === 'DELETE') {
      // check if user is logged
      if (!session.user) {
        errorResponse = ApiResponseError.getError({
          name: 'AuthorizationError',
          message: 'You must login to create a project.'
        });
        return res.json(errorResponse);
      }
      // veify that user is creator of the resource
      if (session.user.id !== project.createdBy.toString()) {
        errorResponse = ApiResponseError.getError({
          name: 'ForbiddenError',
          message: "You don't have permission to update this project."
        });
        return res.json(errorResponse);
      }
      if (method === 'PUT') {
        const updatedProject = await Object.assign(project, body).save();
        return res.json(updatedProject.view());
      }
      if (method === 'DELETE') {
        await project.remove();
        return res.end();
      }
    }
  } catch (error) {
    errorResponse = ApiResponseError.getError(error);
    return res.json(errorResponse);
  }
  return null;
};

export default Middleware(ProjectHandler);
