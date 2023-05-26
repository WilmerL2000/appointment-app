import {
  getUserPatients,
  login,
  savePatient,
  updateSelectedPatient,
  deletePatient,
  updateProfile,
  savePassword,
} from '../api/v1/functions';
import { setLogout, setLogin, setUser } from './authSlice';
import {
  clearPatientsLogout,
  setPatients,
  addNewPatient,
  updatePatient,
  deletePatientById,
} from './patientSlice';

/**
 * The function "startLogin" logs in a user and sets their token in the Redux store.
 * @param values - The `values` parameter is an object that contains the user's login credentials, such
 * as their email and password. It is passed as an argument to the `startLogin` function.
 * @returns The function `startLogin` is returning an asynchronous function that takes a `dispatch`
 * parameter. This function calls the `login` function with the `values` parameter and awaits its
 * response. Once the response is received, it dispatches an action with the `setLogin` function,
 * passing the `token` as an argument.
 */
const startLogin = (values) => {
  return async (dispatch) => {
    const { token, user } = await login(values);
    dispatch(setLogin({ token, user }));
  };
};

/**
 * This function logs out a user by dispatching two actions.
 * @returns The function `startLogout` is returning an asynchronous function that takes a `dispatch`
 * parameter. This function dispatches two actions: `clearPatientsLogout()` and `setLogout()`.
 */
const startLogout = () => {
  return async (dispatch) => {
    dispatch(clearPatientsLogout());
    dispatch(setLogout());
  };
};

/**
 * This function retrieves user profile and patient information using a token and dispatches the
 * results to the store.
 * @returns The function `startLoadingInfo` is returning an asynchronous function that takes two
 * arguments: `dispatch` and `getState`.
 */
const startLoadingInfo = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const patients = await getUserPatients({ token });
    dispatch(setPatients(patients));
  };
};

/**
 * This function saves a new patient and adds them to the state.
 * @param newPatient - The newPatient parameter is an object that contains information about a patient
 * that needs to be saved. This information could include the patient's name, age, gender, medical
 * history, and any other relevant details.
 * @returns A function that takes in `newPatient` as a parameter and returns an asynchronous function
 * that takes in `dispatch` and `getState` as parameters. The inner function dispatches an action to
 * add the new patient to the store after saving the patient data using the `savePatient` function.
 */
const startSavePatient = (newPatient) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const patient = await savePatient({ token }, newPatient);
    dispatch(addNewPatient(patient));
  };
};

/**
 * This is an asynchronous function that updates a selected patient and dispatches an action to update
 * the patient.
 * @param patient - The patient object that needs to be updated.
 * @returns The function `startUpdatePatient` is returning an asynchronous function that takes two
 * arguments: `dispatch` and `getState`. This function dispatches an action `updatePatient` with the
 * updated patient data after calling the `updateSelectedPatient` function with the `token` from the
 * `auth` state and the `patient` object passed as an argument to `startUpdatePatient`.
 */
const startUpdatePatient = (patient) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    await updateSelectedPatient({ token }, patient);
    dispatch(updatePatient({ patient }));
  };
};

/**
 * This is an asynchronous function that deletes a patient by ID and dispatches an action to update the
 * state.
 * @param id - The `id` parameter is the unique identifier of the patient that needs to be deleted. It
 * is passed as an argument to the `startDeletePatient` function.
 * @returns A function that takes in `id` as a parameter and returns an asynchronous function that
 * takes in `dispatch` and `getState` as parameters. The inner function calls the `deletePatient`
 * function with the `token` from the `auth` state and the `id` parameter, and then dispatches the
 * `deletePatientById` action with the `id` parameter.
 */
const startDeletePatient = (id) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await deletePatient(token, id);
    dispatch(deletePatientById(id));
  };
};

/**
 * This is an asynchronous function that updates the user's profile information and dispatches the
 * updated user data to the store.
 * @param user - The `user` parameter is an object that contains the updated profile information for
 * the user. This object could include properties such as `name`, `email`, `bio`, `avatar`, etc.
 * @returns A function that takes in a `user` object as an argument and returns an asynchronous
 * function that takes in `dispatch` and `getState` as arguments. The inner function updates the user's
 * profile information using the `updateProfile` function and the `token` from the `auth` state in the
 * Redux store. Once the profile information is updated, it dispatches an action to update the user's
 */
const startChangeProfileInfo = (user) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const data = await updateProfile({ user, token });
    dispatch(setUser({ user: data }));
  };
};

const startChangePassword = (values) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await savePassword({ token, values });
  };
};

export {
  startLogin,
  startLogout,
  startLoadingInfo,
  startSavePatient,
  startUpdatePatient,
  startDeletePatient,
  startChangeProfileInfo,
  startChangePassword,
};
