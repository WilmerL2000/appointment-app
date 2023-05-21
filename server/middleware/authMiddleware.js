import jwt from 'jsonwebtoken';
import Vet from '../mongodb/models/Vet.js';

/**
 * This is an Express middleware function that checks for a valid JWT token in the request headers and
 * assigns the decoded token's ID to the `req.veterinary` property for use in subsequent middleware functions
 * or routes.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client to
 * the server. It contains information about the request such as the request headers, request
 * parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `send`, `json`, `status`, etc. that are used to send the
 * response data and set the HTTP status code.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically called at the end of the current middleware function to indicate that it
 * has completed its task and the next middleware function can take over. If there are no more
 * middleware functions in the chain
 * @returns The `checkToken` middleware function is returning the result of calling the `next()`
 * function, which passes control to the next middleware function or route handler in the chain. If the
 * `authorization` header is present and contains a valid JWT token, the function assigns the decoded
 * token's ID to the `req.veterinary` property and then calls `next()`. If the `authorization` header is
 * missing
 */
const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /* `req.veterinary` start sesion in espress is assigning the result of a MongoDB query to the `vet` property of the `req`
      object. The query is searching for a veterinarian document with the ID that was decoded from
      the JWT token, and the `.select()` method is used to exclude certain fields from the query
      result. This allows the `vet` object to be accessed in subsequent middleware functions or
      routes. */
      //!Create a session in express that can be used in all the routes
      req.veterinary = await Vet.findById(decoded.id).select(
        '-password -token -confirmed'
      );
      //Next middleware
      return next();
    } catch (err) {
      const error = new Error('Token no válido ');
      res.status(403).send({ msg: error.message });
    }
  }

  if (!token) {
    const error = new Error('Token no válido o inexistente');
    res.status(403).send({ msg: error.message });
  }

  next();
};

export default checkToken;
