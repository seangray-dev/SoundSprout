import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchSounds = createAsyncThunk('search/searchSounds', async (query: string) => {
  const response = await axios.get(`/api/search/?query=${query}`);
  return response.data;
});

type SearchState = {
  results: {
    sounds_by_title: any[];
    sounds_by_tag: any[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: SearchState = {
  results: {
    sounds_by_title: [],
    sounds_by_tag: []
  },
  status: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchSounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchSounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(searchSounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default searchSlice.reducer;
