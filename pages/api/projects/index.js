import mongoose from 'mongoose';
import Middleware from '../../../middlewares';

const Project = mongoose.model('Project');
/**
 * @async
 * @desc Api handles project list and search request
 * @param {{ req: NextApiRequest, res: NextApiResponse }} prop
 */
const IndexProjectHandler = async ({ req, res }) => {
  if (req.method === 'GET') {
    const limit = req.query.limit || 0;
    const filter = req.query.filter || 'name';
    const page = req.query.page || 0;
    const keyword = req.query.keyword || '';
    const offset = Number(page) * Number(limit);
    let searchFilter = null;
    // list projects by filter
    switch (filter) {
      case 'name':
        searchFilter = { name: { $regex: new RegExp(`.*${keyword}.*`, 'i') } };
        break;
      case 'status':
        searchFilter = { status: keyword };
        break;
      case 'contractors':
        searchFilter = { 'contractors.name': { $regex: new RegExp(`.*${keyword}.*`, 'i') } };
        break;
      default:
        searchFilter = {};
        break;
    }
    const projects = await Project.find(searchFilter).limit(Number(limit)).skip(offset).sort('-createdAt');
    const data = projects.length ? projects.map((project) => project.view(true)) : [];
    return res.json(data);
  }
  return null;
};

export default Middleware(IndexProjectHandler);
