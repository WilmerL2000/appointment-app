import { patientApi, vetApi } from './api';
import { toast } from 'sonner';

/**
 * This is an asynchronous function that sends a login request to a server and returns a token and user
 * data if successful, or displays an error message if unsuccessful.
 * @param values - The `values` parameter is an object that contains the user's login credentials, such
 * as their email and password. This object is passed as the second argument to the `post` method of
 * the `vetApi` object, which sends a POST request to the '/login' endpoint of the API with
 * @returns The `login` function is returning an object with two properties: `token` and `user`. The
 * `token` property contains the token received from the server after successful login, and the `user`
 * property contains the user data received from the server. If there is an error during the login
 * process, the function will display an error message using the `toast` library.
 */
const login = async (values) => {
  try {
    const { data } = await vetApi.post('/login', values);
    return { token: data.token, user: data.user };
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

/**
 * This is an asynchronous function that updates a user's profile information using a PATCH request to
 * a vet API and returns the updated user data.
 * @returns the `data` object received from the API response, after removing the `confirmed`, `token`,
 * `__v` properties. If the API call is successful, it also displays a success toast message. If there
 * is an error, it displays an error toast message.
 */
const updateProfile = async ({ token: userToken, user: userData }) => {
  try {
    const { data } = await vetApi.patch(`/profile/${userData._id}`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (data) toast.success('Información guardada correctamente');
    const { confirmed, token, __v, ...user } = data;
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

/**
 * The function saves a patient's data to an API using an authorization token.
 * @param patient - The `patient` parameter is an object that contains information about a patient,
 * such as their name, age, gender, and any medical conditions they may have. This object is passed as
 * the second argument to the `patientApi.post` method, which sends a POST request to a server to save
 * the
 * @returns an object that contains all the properties of the patient object passed as an argument,
 * except for the properties `createdAt`, `updatedAt`, and `__v`. These properties are being
 * destructured from the response data object received from the `patientApi.post` request. If there is
 * an error, the function logs the error message.
 */
const savePatient = async ({ token }, patient) => {
  try {
    const { data } = await patientApi.post('', patient, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) toast.success('Paciente creado correctamente');
    const { createdAt, updatedAt, __v, ...restPatient } = data;
    return restPatient;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

/**
 * This function retrieves a list of patients for a user with a given token.
 * @returns The function `getUserPatients` is returning the `data` property from the response of a
 * request made to the `patientApi` endpoint. The data returned is likely an array of patient objects
 * or a single patient object, depending on the implementation of the `patientApi` endpoint.
 */
const getUserPatients = async ({ token }) => {
  const { data } = await patientApi('', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

/**
 * This function updates a selected patient's information in the database using a PATCH request and
 * returns the updated patient object.
 * @param patient - The `patient` parameter is an object that represents the patient to be updated. It
 * contains properties such as `_id`, `name`, `age`, `gender`, `diagnosis`, etc. These properties will
 * be used to update the patient's information in the database.
 * @returns an object containing the patient data with the createdAt, updatedAt, and __v properties
 * removed. If the update is successful, it also displays a success message using the toast library. If
 * there is an error, it logs the error message to the console.
 */
const updateSelectedPatient = async ({ token }, patient) => {
  try {
    const { data } = await patientApi.patch(`/${patient._id}`, patient, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) toast.success('Paciente modificado correctamente');
    const { createdAt, updatedAt, __v, ...restPatient } = data;
    return restPatient;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

/**
 * This function deletes a patient using an API call with authorization token and displays a success
 * message using toast.
 * @param token - The token is a string that represents the authentication token of the user making the
 * request. It is used to verify the identity of the user and ensure that they have the necessary
 * permissions to perform the requested action.
 * @param id - The `id` parameter is the unique identifier of the patient that needs to be deleted from
 * the database. It is used in the API endpoint to specify which patient to delete.
 */
const deletePatient = async (token, id) => {
  try {
    const { data } = await patientApi.delete(`/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) toast.success('Paciente eliminado correctamente');
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
  updateProfile,
  savePatient,
  getUserPatients,
  updateSelectedPatient,
  deletePatient,
};
