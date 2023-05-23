import { vetApi } from './api';
import { toast } from 'sonner';

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

export { register, confirmAccount };
