import { Database, Session } from '../libs/mongoose';

const cors = ({req, res}) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    req.greetings = "cors";
    return {req, res};
}
const middlewares = [Database, Session, cors];

const runMiddlewares = async (_middlewares, count, req_res) => {
    if(count == 0)
        return await _middlewares[0](req_res);
    return await _middlewares[count]( 
        await runMiddlewares(_middlewares, count - 1, req_res)
    );
}

const Middleware =  function(handlers) {
    return async (req, res) => {
        // loop through middlewares
        const functions = middlewares.concat(...arguments);
        for (let fn of functions) {
            if ( typeof(fn) !== 'function')
                throw ` ${fn.toString()} is not a function`
        }
        return await runMiddlewares(functions, functions.length - 1, {req, res} );
    }
};

export default Middleware;
