import { vetApi } from './api';
import { toast } from 'sonner';

/**
 * This function logs in a user by sending a POST request to a server and storing the received token in
 * local storage.
 * @param values - The `values` parameter is an object that contains the user's login credentials, such
 * as their email and password. This object is passed as the second argument to the `post` method of
 * the `vetApi` object, which sends a POST request to the `/login` endpoint of the API with
 */
const login = async (values) => {
  try {
    const { data } = await vetApi.post('/login', values);
    return data.token;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

/**
 * The function registers a user by sending their information to an API and displays a success message
 * or an error message if there is an issue.
 * @param values - The "values" parameter is an object that contains the data to be sent in the POST
 * request to the "vetApi" endpoint. It could include properties such as name, email, password, etc.
 */
const register = async (values) => {
  try {
    await vetApi.post('', values);
    toast.success('Creado correctamente, revisa tu correo');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

/**
 * This is an asynchronous function that confirms an account by making a request to a vetApi endpoint
 * and returns a message and error status.
 * @param id - The `id` parameter is a unique identifier that is used to confirm a user's account. It
 * is passed as a parameter to the `confirmAccount` function and is used to make a request to the
 * `vetApi` endpoint with the `/confirm` route and the `id` appended to it
 * @returns The function `confirmAccount` returns an object with two properties: `msg` and `error`. The
 * value of `msg` depends on whether the API call was successful or not. If the call was successful,
 * `msg` will contain a message from the API indicating that the account was confirmed. If the call was
 * unsuccessful, `msg` will contain an error message from the API. The value
 */
const confirmAccount = async (id) => {
  try {
    const { data } = await vetApi(`/confirm/${id}`);
    if (data) return { msg: data.msg, error: false };
  } catch (error) {
    return { msg: error.response.data.msg, error: true };
  }
};

/**
 * This function sends a forgot password request to the server and displays a success or error message
 * using toast notifications.
 * @param email - The email parameter is a string that represents the email address of the user who
 * wants to reset their password. It is passed as an argument to the forgotPassword function.
 */
const forgotPassword = async (email) => {
  try {
    const { data } = await vetApi.post('/forgot-password', { email });
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

/**
 * The function checks if a given token is valid for a forgot password API endpoint.
 * @param token - The `token` parameter is a string representing a unique identifier for a forgot
 * password request. It is used to verify the authenticity of the request and allow the user to reset
 * their password.
 * @returns The function `checkToken` is returning an object with two properties: `msg` and `error`.
 * The value of `msg` is the error message returned from the API call if there was an error, or
 * `undefined` if the API call was successful. The value of `error` is a boolean indicating whether
 * there was an error (`true`) or not (`false`).
 */
const checkToken = async (token) => {
  try {
    await vetApi(`/forgot-password/${token}`);
  } catch (error) {
    return { msg: error.response.data.msg, error: true };
  }
};

/**
 * This function restores a forgotten password by sending a POST request to a vetApi endpoint with a
 * token and new password, and displays a success or error message using toast.
 */
const restorePassword = async ({ token, password }) => {
  try {
    const { data } = await vetApi.post(`/forgot-password/${token}`, {
      password,
    });
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

/**
 * This function retrieves a user's profile data from an API using an authentication token.
 * @returns The function `getUserProfile` is returning a Promise that resolves to the `data` object
 * returned from the `vetApi` function call. If there is an error, the function logs the error message
 * to the console and does not return anything.
 */
const getUserProfile = async ({ token }) => {
  if (!token) return;

  try {
    const { data } = await vetApi('/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

export {
  login,
  register,
  confirmAccount,
  forgotPassword,
  checkToken,
  restorePassword,
  getUserProfile,
};
