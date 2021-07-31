import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEventsData } from './exampleCareerEvents';

export const asyncFetchEventsData = createAsyncThunk(
  'events/careerFairs',
  async () => {
    const response = await getEventsData();
    return response;
  }
);

export const asyncCreateFairEvent = createAsyncThunk(
  'events/create',
  async (newEvent) => {
    const response = { ...newEvent, id: '555' };
    return response;
  }
);

export const asyncDeleteFairEvent = createAsyncThunk(
  'events/delete',
  async (newEvent) => {
    return;
  }
);

const initialState = {
  loading: false,
  //
  events: [], // List of University Career Fair events
};

export const eventsSlice = createSlice({
  name: 'fair',
  initialState,
  reducers: {
    resetEvents: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchEventsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncFetchEventsData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.events = payload;
      })
      .addCase(asyncCreateFairEvent.fulfilled, (state, { payload }) => {
        state.events.push(payload);
      });
  },
});

export const { resetEvents } = eventsSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default eventsSlice.reducer;
