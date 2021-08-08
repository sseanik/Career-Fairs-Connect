import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { prominent } from 'color.js';
import complementaryTextColour from '../../util/complementaryTextColour';
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
  async ({ id, approval_status, toast }) => {
    const response = await axios({
      method: 'put',
      url: '/careerfairs/applications/',
      data: {
        stall_id: id,
        approval_status: approval_status,
      },
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      toast({
        description:
          'Successfully changed Stall approval status to ' + approval_status,
        status: 'success',
        isClosable: true,
      });
    }

    const data = await response.data;

    return { id: data.stall_id, approval_status: data.approval_status };
  }
);

/* --------------------------- Company Perspective -------------------------- */
// Add a company stall to the career fair event
export const asyncAddCompanyStall = createAsyncThunk(
  'fair/addStall',
  async ({ stall, logo, description, company, toast }) => {
    const response = await axios({
      method: 'post',
      url: `/careerfairs/${stall.event_id}/stalls/`,
      data: stall,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

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

    const data = await response.data;

    return {
      data: data,
      logo: logo,
      description: description,
      company: company,
    };
  }
);

// Delete a company stall from an event
export const asyncRemoveCompanyStall = createAsyncThunk(
  'fair/removeStall',
  async ({ data, company, toast }) => {
    const response = await axios({
      method: 'delete',
      url: '/careerfairs/delete/stalls/',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      data: data,
    });

    if (response.status === 200) {
      toast({
        description: 'Successfully removed Company Stall from event',
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        description: 'Failed to remove stall from event',
        status: 'error',
        isClosable: true,
      });
    }

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
        const stall = state.stalls.find((stall) => stall.id === payload.id);
        stall.approval_status = payload.approval_status;
      })
      // Add a company stall to the career fair event
      .addCase(asyncAddCompanyStall.pending, (state, { payload }) => {
        state.status = true;
      })
      .addCase(asyncAddCompanyStall.fulfilled, (state, { payload }) => {
        state.status = false;
        state.stalls.push({
          pending: payload.data.approval_status,
          company: payload.company,
          description: payload.description,
          id: payload.data.stall_id,
          live: false,
          logo: payload.logo,
        });
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
