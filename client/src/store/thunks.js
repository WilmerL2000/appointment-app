import {
  getUserPatients,
  login,
  savePatient,
  updateSelectedPatient,
  deletePatient,
  updateProfile,
  savePassword,
  register,
} from '../api/v1/functions';
import { setLogout, setLogin, setUser, setLoading } from './authSlice';
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
    dispatch(setLoading());
    const { token, user, ok } = await login(values);
    if (ok) {
      dispatch(setLogin({ token, user }));
    } else {
      dispatch(setLoading());
    }
  };
};

/**
 * This function starts a registration process, dispatches a loading action, registers the user with
 * the provided values, dispatches another loading action, and navigates to the home page.
 * @param values - an object containing the values to be used for registration
 * @param navigate - `navigate` is a function that is used to navigate to a different page or route in
 * the application. It is typically provided by a routing library such as React Router. In this code
 * snippet, it is used to navigate to the home page after the registration process is complete.
 * @returns The function `startRegister` is returning an asynchronous function that takes in `dispatch`
 * and `navigate` as arguments. This function dispatches the `setLoading` action, calls the `register`
 * function with the `values` argument, dispatches the `setLoading` action again, and finally navigates
 * to the home page (`'/'`) using the `navigate` function.
 */
const startRegister = (values, navigate, onSubmitProps) => {
  return async (dispatch) => {
    dispatch(setLoading());
    await register(values);
    dispatch(setLoading());
    onSubmitProps.resetForm();
    navigate('/');
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

/**
 * This is an asynchronous function that saves a new password using a token and values passed as
 * arguments.
 * @param values - The `values` parameter is an object that contains the new password that the user
 * wants to set. This object may have one or more properties, depending on the requirements of the
 * `savePassword` function.
 * @returns The function `startChangePassword` is returning an asynchronous function that takes two
 * arguments: `dispatch` and `getState`. This function is using the `await` keyword to wait for the
 * `savePassword` function to complete before continuing. The `savePassword` function is being passed
 * an object with two properties: `token` and `values`. The `token` property is being retrieved from
 * the `
 */
const startChangePassword = (values) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    await savePassword({ token, values });
  };
};

export {
  startLogin,
  startRegister,
  startLogout,
  startLoadingInfo,
  startSavePatient,
  startUpdatePatient,
  startDeletePatient,
  startChangeProfileInfo,
  startChangePassword,
};
