import { applySession } from 'next-session';
import { sessionOptions } from '../middlewares/Session';

const getSession = async (req, res) => {
  await applySession(req, res, sessionOptions);

  return JSON.stringify(req.session || {});
};

export default getSession;
