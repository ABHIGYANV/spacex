// src/redux/slices/launchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch SpaceX launches from the API
export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/launches');
  return response.data;
});

const launchSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    filteredLaunches: [],
    loading: false,
    error: null,
    filters: {
      year: '',
      status: '',
      search: ''
    },

  },
  reducers: {
    setFilterYear(state, action) {
      state.filters.year = action.payload;
    },
    setFilterStatus(state, action) {
      state.filters.status = action.payload;
    },
    setSearchTerm(state, action) {
      state.filters.search = action.payload;
    },
    applyFilters(state) {
      let filtered = state.launches;

      if (state.filters.year) {
        filtered = filtered.filter(launch => new Date(launch.launch_date_local).getFullYear().toString() === state.filters.year);
      }

      if (state.filters.status) {
        filtered = filtered.filter(launch => launch.launch_success === (state.filters.status === 'Success'));
      }

      if (state.filters.search) {
        filtered = filtered.filter(launch => launch.mission_name.toLowerCase().includes(state.filters.search.toLowerCase()));
      }

      state.filteredLaunches = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.launches = action.payload;
        state.filteredLaunches = action.payload;
        state.loading = false;

      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setFilterYear, setFilterStatus, setSearchTerm, applyFilters } = launchSlice.actions;
export default launchSlice.reducer;
