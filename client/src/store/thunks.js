import { getUserPatients, getUserProfile } from '../api/v1/functions';
import { setLogout, setUser } from './authSlice';
import { clearPatientsLogout, setPatients } from './patientSlice';

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
    const user = await getUserProfile({ token });
    dispatch(setUser({ user }));

    const patients = await getUserPatients({ token });
    dispatch(setPatients(patients));
  };
};

export { startLogout, startLoadingInfo };
