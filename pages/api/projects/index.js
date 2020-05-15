import mongoose from 'mongoose';
import Middleware from '../../../middlewares';

const Project = mongoose.model('Project');

const IndexProjectHandler = async ({ req, res }) => {
  if (req.method === 'GET') {
    const {
      limit = 0,
      filter = 'name',
      page = 0,
      keyword = ''
    } = req.query;
    const offset = Number(page) * Number(limit);
    let searchFilter = null;
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
