import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    addNewPatient: (state, action) => {
      state.patients.push(action.payload);
    },
  },
});

export const { setPatients, addNewPatient } = patientSlice.actions;
