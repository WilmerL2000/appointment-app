import jwt from 'jsonwebtoken';

/**
 * This function generates a JSON Web Token (JWT) with a specified expiration time and a given user ID.
 * @param id - The `id` parameter is the unique identifier of the user for whom the JSON Web Token
 * (JWT) is being generated. It is used to create a payload for the JWT.
 * @returns The function `generateJWT` is returning a JSON Web Token (JWT) that is signed with the `id`
 * parameter and a secret key stored in the `JWT_SECRET` environment variable. The token will expire
 * after 10 days.
 */
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
};

export default generateJWT;
