import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { prominent } from 'color.js';
import complementaryTextColour from '../../util/complementaryTextColour';
import { getFairData } from '../../exampleData/exampleCareerFair';
import axios from 'axios';

// Get Career Fair Event Data
export const asyncFetchFairData = createAsyncThunk(
  'fair/university',
  async (fairID) => {
    const response = await axios({
      method: 'get',
      url: `/careerfairs/${fairID}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.data;

    console.log('response = ', data)
    const colour = await prominent(data.logo, {
      amount: 2,
    });
    
    return { ...data, colour: colour };
  }
);


/* ------------------------- University Perspective ------------------------- */
// Edit a Career Fair Events Details
export const asyncEditFairEvent = createAsyncThunk(
  'fair/edit',
  async ({ event, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = event;
    toast({
      description: 'Successfully edited Career Fair Event',
      status: 'success',
      isClosable: true,
    });
    return response;
  }
);

// Change a company stall's approval status
export const asyncToggleEventPending = createAsyncThunk(
  'fair/togglePending',
  async ({ id, toggle, toast }) => {
    await new Promise((r) => setTimeout(r, 500));
    toast({
      description: 'Successfully changed Stall approval status',
      status: 'success',
      isClosable: true,
    });
    return { id: id, toggle: toggle };
  }
);

/* --------------------------- Company Perspective -------------------------- */
// Add a company stall to the career fair event
export const asyncAddCompanyStall = createAsyncThunk(
  'fair/addStall',
  async ({ stall, fairID, toast }) => {
    // await new Promise((r) => setTimeout(r, 3000));
    // const response = { ...stall, id: '5678' };
    const response = await axios({
      method: 'post',
      url: `/careerfairs/${fairID}/stalls/`,
      data: stall,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    console.log('asyncAddCompanyStall response=',response);

    if (response.status === 200) {
    toast({
      description: 'Successfully added Company Stall',
      status: 'success',
      isClosable: true,
    });
    } else {
      toast({
        description: 'Failed to apply',
        status: 'error',
        isClosable: true,
      });
    }


    return response;
  }
);

// Delete a company stall from an event
export const asyncRemoveCompanyStall = createAsyncThunk(
  'fair/removeStall',
  async ({ fairID, company, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    toast({
      description: 'Successfully removed Company Stall',
      status: 'success',
      isClosable: true,
    });
    return company;
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
