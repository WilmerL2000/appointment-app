import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patient: null,
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload.patient;
    },
  },
});

export const { setToken, setLogout, setPatient } = patientSlice.actions;
