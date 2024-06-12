// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signup(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, signup, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
