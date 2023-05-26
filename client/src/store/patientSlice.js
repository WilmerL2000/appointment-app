import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  activePatient: null,
  isLoading: false,
  patientIdToDelete: null,
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
      state.isLoading = false;
    },
    addNewPatient: (state, action) => {
      state.patients.unshift(action.payload);
    },
    updatePatient: (state, action) => {
      const updatedPatients = state.patients.map((patient) => {
        if (patient._id === action.payload.patient._id)
          return action.payload.patient;
        return patient;
      });
      state.patients = updatedPatients;
      state.activePatient = action.payload.patient;
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
  setLoading,
  setPatients,
  addNewPatient,
  updatePatient,
  deletePatientById,
  setActivePatient,
  clearPatientsLogout,
  setPatientId,
} = patientSlice.actions;
