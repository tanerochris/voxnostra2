import mongoose from 'mongoose';
import Middleware from '../../../middlewares';
import { ApiResponseError } from '../../../helpers/api-errors';

const Project = mongoose.model('Project');
/**
 * @desc Api handles GET, PUT and DELETE requests on a project
 * @param {{ req: NextApiRequest, res: NextApiResponse }} prop
 */
const ProjectHandler = async ({ req, res }) => {
  let errorResponse = null;
  const { session, query, body, method } = req;
  const id = query.project_id;

  try {
    const project = await Project.findById(id);
    // Check existence of project
    if (!project) {
      errorResponse = ApiResponseError.getError({ name: 'NotFoundError', message: `Item with id: ${id} not found.` });
      return res.json(errorResponse);
    }
    // handle get request
    if (method === 'GET') {
      return res.json(project.view());
    }
    // handle project update
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
      // handle update of project with new data
      if (method === 'PUT') {
        const updatedProject = await Object.assign(project, body).save();
        return res.json(updatedProject.view());
      }
      // handle deletion of project from platform
      if (method === 'DELETE') {
        await project.remove();
        return res.end();
      }
    }
  } catch (error) {
    // handle error
    errorResponse = ApiResponseError.getError(error);
    return res.json(errorResponse);
  }
  return null;
};

export default Middleware(ProjectHandler);
