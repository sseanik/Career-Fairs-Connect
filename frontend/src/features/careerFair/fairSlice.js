import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { prominent } from 'color.js';
import complementaryTextColour from '../../util/complementaryTextColour';
import { getFairData } from '../../exampleData/exampleCareerFair';

// Get Career Fair Event Data
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

/* ------------------------- University Perspective ------------------------- */
// Edit a Career Fair Events Details
export const asyncEditFairEvent = createAsyncThunk(
  'fair/edit',
  async (event) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = event;
    return response;
  }
);

// Change a company stall's approval status
export const asyncToggleEventPending = createAsyncThunk(
  'fair/togglePending',
  async ({ id, toggle }) => {
    await new Promise((r) => setTimeout(r, 3000));
    return { id: id, toggle: toggle };
  }
);

/* --------------------------- Company Perspective -------------------------- */
// Add a company stall to the career fair event
export const asyncAddCompanyStall = createAsyncThunk(
  'fair/addStall',
  async ({ stall, fairID }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = { ...stall, id: '5545' };
    return response;
  }
);

// Delete a company stall from an event
export const asyncRemoveCompanyStall = createAsyncThunk(
  'fair/removeStall',
  async ({ fairID, name }) => {
    await new Promise((r) => setTimeout(r, 3000));
    return name;
  }
);

const initialState = {
  loading: false,
  status: false,
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
      // Get Career Fair Event Data
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
        const dominantColourObj = complementaryTextColour(payload.colour);
        state.bgColour = dominantColourObj.bgColour;
        state.textColour = dominantColourObj.textColour;
      })
      // Edit a Career Fair Events Details
      .addCase(asyncEditFairEvent.pending, (state, { payload }) => {
        state.status = true;
      })
      .addCase(asyncEditFairEvent.fulfilled, (state, { payload }) => {
        state.status = false;
        state.title = payload.title;
        state.description = payload.description;
        state.start = payload.start;
        state.end = payload.end;
      })
      // Change a company stall's approval status
      .addCase(asyncToggleEventPending.fulfilled, (state, { payload }) => {
        state.approvalStatus = true;
        state.rejectStatus = true;
        state.pendingStatus = true;
        const stall = state.stalls.find((stall) => stall.id === payload.id);
        stall.pending = payload.toggle;
      })
      // Add a company stall to the career fair event
      .addCase(asyncAddCompanyStall.pending, (state, { payload }) => {
        state.status = true;
      })
      .addCase(asyncAddCompanyStall.fulfilled, (state, { payload }) => {
        state.status = false;
        state.stalls.push(payload);
      })
      // Delete a company stall from an event
      .addCase(asyncRemoveCompanyStall.pending, (state, { payload }) => {
        state.status = true;
      })
      .addCase(asyncRemoveCompanyStall.fulfilled, (state, { payload }) => {
        state.status = false;
        state.stalls = state.stalls.filter(
          (stall) => stall.company !== payload
        );
      });
  },
});

export const { resetFair } = fairSlice.actions;

export default fairSlice.reducer;
