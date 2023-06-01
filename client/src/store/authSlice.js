import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout, setUser, setLoading } = authSlice.actions;
