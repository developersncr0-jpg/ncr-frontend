import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async () => {
    const response = await axios.get('https://ncr-backend-701153034898.europe-west1.run.app/view');
    return response.data;
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    data: [],
    loading: false,
     error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  }
});

export default applicationSlice.reducer;
