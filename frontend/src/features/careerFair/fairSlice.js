import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFairData } from './exampleCareerFair';
import { prominent } from 'color.js';

export const asyncFetchFairData = createAsyncThunk(
  'fair/university',
  async (fairID) => {
    const response = await getFairData(fairID);
    const colour = await prominent(response.logo, {
      amount: 2,
    });
    return { ...response, colour: colour };
  }
);

const initialState = {
  loading: false,
  //
  university: '', // Name of the University
  start: '', // Start Date of fair in epoch time
  end: '', // End Date of fair in epoch time
  title: '', // Title of Career Fair
  description: '',
  logo: '', // Base64 encoded string of logo
  stalls: [], // List of stalls in the career fair
  events: [], // List of presentation events for that company
  opportunities: [], // List of opportunities for that company
  //
  bgColour: 'white',
  textColour: 'black',
};

export const fairSlice = createSlice({
  name: 'fair',
  initialState,
  reducers: {
    resetFair: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchFairData.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncFetchFairData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.university = payload.university;
        state.title = payload.title;
        state.description = payload.description;
        state.start = payload.start;
        state.end = payload.end;
        state.website = payload.website;
        state.logo = payload.logo;
        state.stalls = payload.stalls;
        state.events = payload.events;
        state.opportunities = payload.opportunities;

        let index = -1;
        if (
          payload.colour[0][0] + payload.colour[0][1] + payload.colour[0][2] !==
          0
        ) {
          index = 0;
        } else if (
          payload.colour[1][0] + payload.colour[1][1] + payload.colour[1][2] !==
          0
        ) {
          index = 1;
        }
        if (index !== -1) {
          state.bgColour = `rgb(${payload.colour[index][0]}, ${payload.colour[index][1]}, ${payload.colour[index][2]})`;
          payload.colour[index][0] * 0.299 +
            payload.colour[index][1] * 0.587 +
            payload.colour[index][2] * 0.114 >
          186
            ? (state.textColour = 'black')
            : (state.textColour = 'white');
        }
      });
  },
});

export const { resetFair } = fairSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default fairSlice.reducer;
