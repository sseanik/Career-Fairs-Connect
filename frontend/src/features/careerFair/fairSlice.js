import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFairData } from './exampleCareerFair';
import { prominent } from 'color.js';
import getDominantColour from '../../components/getDominantColour';

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

export const asyncEditFairEvent = createAsyncThunk(
  'fair/edit',
  async (event) => {
    const response = event;
    return response;
  }
);

export const asyncToggleEventPending = createAsyncThunk(
  'fair/togglePending',
  async ({ id, toggle }) => {
    return { id, toggle };
  }
);

export const asyncAddCompanyStall = createAsyncThunk(
  'fair/addStall',
  async ({ stall, fairID }) => {
    const response = { ...stall, id: '5545' };
    return response;
  }
);

export const asyncRemoveCompanyStall = createAsyncThunk(
  'fair/removeStall',
  async ({ fairID, name }) => {
    return name;
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

        const dominantColourObj = getDominantColour(payload.colour);
        state.bgColour = dominantColourObj.bgColour;
        state.textColour = dominantColourObj.textColour;
      })
      .addCase(asyncEditFairEvent.fulfilled, (state, { payload }) => {
        state.title = payload.title;
        state.description = payload.description;
        state.start = payload.start;
        state.end = payload.end;
      })
      .addCase(asyncToggleEventPending.fulfilled, (state, { payload }) => {
        const stall = state.stalls.find((stall) => stall.id === payload.id);
        stall.pending = payload.toggle;
      })
      .addCase(asyncAddCompanyStall.fulfilled, (state, { payload }) => {
        state.stalls.push(payload);
      })
      .addCase(asyncRemoveCompanyStall.fulfilled, (state, { payload }) => {
        state.stalls = state.stalls.filter(
          (stall) => stall.company !== payload
        );
      });
  },
});

export const { resetFair } = fairSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default fairSlice.reducer;
