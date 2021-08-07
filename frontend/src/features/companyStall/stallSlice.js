import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getStallData } from '../../exampleData/exampleCompanyStall';
import { prominent } from 'color.js';
import complementaryTextColour from '../../util/complementaryTextColour';
import axios from 'axios';

// Get Stall Data
export const asyncFetchStallData = createAsyncThunk(
  'stall/company',
  async (stallID) => {
    // const response = await getStallData(stallID);
    const response = await axios({
      method: 'get',
      url: `/careerfairs/stalls/${stallID}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    const colour = await prominent(response.data.logo, {
      amount: 2,
    });

    return { ...response.data, colour: colour };
  }
);

/* ------------------------------- Opportunity ------------------------------ */
// Add a Job Opportunity
export const asyncAddOpportunity = createAsyncThunk(
  'stall/addOpportunity',
  async ({ stallID, opportunity, toast }) => {
    console.log(opportunity)
    const response = await axios({
      method: 'post',
      url: `/company/${stallID}/opportunities/`,
      data: opportunity,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    toast({
      description: 'Successfully added Opportunity',
      status: 'success',
      isClosable: true,
    });

    return response;
  }
);

// Edit Job Opportunity
export const asyncEditOpportunity = createAsyncThunk(
  'stall/editOpportunity',
  async ({ opportunity, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = opportunity;
    toast({
      description: 'Successfully edited Opportunity',
      status: 'success',
      isClosable: true,
    });
    return response;
  }
);

// Delete Job Opportunity
export const asyncDeleteOpportunity = createAsyncThunk(
  'stall/deleteOpportunity',
  async ({ id, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    toast({
      description: 'Successfully removed Opportunity',
      status: 'success',
      isClosable: true,
    });
    return id;
  }
);

/* ------------------------------ Presentation ------------------------------ */
// Add a presentation
export const asyncAddPresentation = createAsyncThunk(
  'stall/addPresentation',
  async ({ presentation, toast }) => {
    const response = await axios({
      method: 'post',
      url: `/presentation​/create​/`,
      data: presentation,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully added Presentation',
      status: 'success',
      isClosable: true,
    });
    return response;
  }
);

// Edit a presentation
export const asyncEditPresentation = createAsyncThunk(
  'stall/editPresentation',
  async ({ presentation, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = presentation;
    toast({
      description: 'Successfully edited Presentation',
      status: 'success',
      isClosable: true,
    });
    return response;
  }
);

// Edit a presentation Time
export const asyncEditPresentationTime = createAsyncThunk(
  'stall/editPresentationTime',
  async (presentation) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = presentation;
    return response;
  }
);

// Delete a presentation
export const asyncDeletePresentation = createAsyncThunk(
  'stall/deletePresentation',
  async ({ id, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    toast({
      description: 'Successfully removed Presentation',
      status: 'success',
      isClosable: true,
    });
    return id;
  }
);

/* ---------------------------------- Q & A --------------------------------- */
// Post a question
export const asyncPostQuestion = createAsyncThunk(
  'stall/postQuestion',
  async ({ question, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    toast({
      description: 'Successfully posted Question',
      status: 'success',
      isClosable: true,
    });
    return question;
  }
);

const initialState = {
  loading: false,
  status: false,
  formStatus: 'Inactive',
  eventFormStatus: 'Inactive',
  //
  fairID: '',
  name: '', // Name of Company
  description: '',
  logo: '', // Base64 encoded string of logo
  live: false, // If current time is inside any presentation ranges (HARD)
  website: '',
  opportunities: [], // List of opportunities for that company
  events: [], // List of presentation events for that company
  qandas: [], // List of all questions and answers
  //
  bgColour: 'white',
  textColour: 'black',
};

export const stallSlice = createSlice({
  name: 'stall',
  initialState,
  reducers: {
    resetStall: (state) => {
      state = initialState;
      return state;
    },
    resetFormStatus: (state) => {
      state.formStatus = 'Inactive';
    },
    resetEventFormStatus: (state) => {
      state.eventFormStatus = 'Inactive';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchStallData.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncFetchStallData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.fairID = payload.fairID;
        state.company = payload.company;
        state.title = payload.title;
        state.description = payload.description;
        state.logo = payload.logo;
        state.live = payload.live;
        state.website = payload.website;
        state.opportunities = payload.opportunities;
        state.events = payload.events;
        state.qandas = payload.qandas;
        const dominantColourObj = complementaryTextColour(payload.colour);
        state.bgColour = dominantColourObj.bgColour;
        state.textColour = dominantColourObj.textColour;
      })
      /* ------------------------------- Opportunity ------------------------------ */
      // Adding a new Opportunity
      .addCase(asyncAddOpportunity.pending, (state, { payload }) => {
        state.status = true;
      })
      .addCase(asyncAddOpportunity.fulfilled, (state, { payload }) => {
        state.status = false;
        state.opportunities.push(payload);
      })
      // Edit an opportunity
      .addCase(asyncEditOpportunity.pending, (state, { payload }) => {
        state.formStatus = 'Pending';
      })
      .addCase(asyncEditOpportunity.fulfilled, (state, { payload }) => {
        state.formStatus = 'Completed';
        const index = current(state.opportunities).findIndex(
          (opportunity) => opportunity.id === payload.id
        );
        state.opportunities[index] = payload;
      })
      // Delete an opportunity
      .addCase(asyncDeleteOpportunity.pending, (state, { payload }) => {
        state.formStatus = 'Pending';
      })
      .addCase(asyncDeleteOpportunity.fulfilled, (state, { payload }) => {
        state.formStatus = 'Completed';
        state.opportunities = state.opportunities.filter(
          (opportunity) => opportunity.id !== payload
        );
      })
      /* ------------------------------ Presentation ------------------------------ */
      // Add a presentation
      .addCase(asyncAddPresentation.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncAddPresentation.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        state.events.push(payload);
      })
      // Edit a Presentation
      .addCase(asyncEditPresentation.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncEditPresentation.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        const index = current(state.events).findIndex(
          (event) => event.id === payload.id
        );
        state.events[index] = payload;
      })
      // Edit a Presentation Time
      .addCase(asyncEditPresentationTime.fulfilled, (state, { payload }) => {
        state.status = false;
        const index = current(state.events).findIndex(
          (event) => event.id === payload.id
        );
        state.events[index] = payload;
      })
      // Delete a Presentation
      .addCase(asyncDeletePresentation.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncDeletePresentation.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        state.events = state.events.filter((event) => event.id !== payload);
      })
      /* ----------------------------------- Q&A ---------------------------------- */
      // Submitting a Question
      .addCase(asyncPostQuestion.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncPostQuestion.fulfilled, (state, { payload }) => {
        state.status = false;
        state.qandas.push({
          id: '2223',
          question: payload,
          answer: '',
        });
      });
  },
});

export const { resetStall, resetFormStatus, resetEventFormStatus } =
  stallSlice.actions;

export default stallSlice.reducer;
