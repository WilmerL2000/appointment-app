import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: null,
  activePatient: null,
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload.patients;
    },
    setActivePatient: (state, action) => {
      state.activePatient = action.payload.activePatient;
    },
  },
});

export const { setPatients } = patientSlice.actions;
