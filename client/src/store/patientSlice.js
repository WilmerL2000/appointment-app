import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  activePatient: null,
  patientIdToDelete: null,
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
      state.isLoading = false;
    },
    addNewPatient: (state, action) => {
      state.patients.unshift(action.payload);
      state.isLoading = false;
    },
    updatePatient: (state, action) => {
      const updatedPatients = state.patients.map((patient) => {
        if (patient._id === action.payload.patient._id)
          return action.payload.patient;
        return patient;
      });
      state.patients = updatedPatients;
      state.activePatient = null;
      state.isLoading = false;
    },
    setActivePatient: (state, action) => {
      state.activePatient = action.payload;
    },
    setPatientId: (state, action) => {
      state.patientIdToDelete = action.payload;
    },
    deletePatientById: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload
      );
      state.patientIdToDelete = null;
    },
    clearPatientsLogout: (state) => {
      state.patients = [];
      state.activePatient = null;
      state.patientIdToDelete = null;
    },
  },
});

export const {
  setPatients,
  addNewPatient,
  updatePatient,
  deletePatientById,
  setActivePatient,
  clearPatientsLogout,
  setPatientId,
} = patientSlice.actions;
