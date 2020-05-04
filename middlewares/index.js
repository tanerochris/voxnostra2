import { Database, Session } from '../libs/mongoose';

const cors = ({ req, res }) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return ({ req, res });
};
const middlewares = [Database, Session, cors];

const runMiddlewares = async (_middlewares, count, reqRes) => {
  if (count === 0) return _middlewares[0](reqRes);
  return _middlewares[count](await runMiddlewares(_middlewares, count - 1, reqRes));
};

const Middleware = (...rest) => (req, res) => {
  // loop through middlewares
  const functions = middlewares.concat(rest);
  for (let i = 0; i < functions.length; i += 1) {
    if (typeof functions[i] !== 'function') throw new Error(`${functions[i].toString()} is not a function`);
  }
  return runMiddlewares(functions, functions.length - 1, { req, res });
};

export default Middleware;
