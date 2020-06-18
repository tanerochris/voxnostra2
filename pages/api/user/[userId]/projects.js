import { CastError } from 'mongoose';
import Middleware from '../../../../middlewares';
import ProjectModel from '../../../../models/project/project.model';

async function UserProjectsHandler({ req, res }) {
  const userId = req.query.userId === 'me' ? req.session.user.id : req.query.userId;

  try {
    const userProjects = await ProjectModel.find({ createdBy: userId }).exec();

    res.send(userProjects);
  } catch (e) {
    if (e instanceof CastError) {
      res.send([]);
    }
  }
}

export default Middleware(UserProjectsHandler);
