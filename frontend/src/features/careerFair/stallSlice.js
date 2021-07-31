import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getStallData } from './exampleCompanyStall';
import { prominent } from 'color.js';
import getDominantColour from '../../components/getDominantColour';

export const asyncFetchStallData = createAsyncThunk(
  'stall/company',
  async (stallID) => {
    const response = await getStallData(stallID);
    const colour = await prominent(response.logo, {
      amount: 2,
    });
    return { ...response, colour: colour };
  }
);

/* ------------------------------- Opportunity ------------------------------ */
export const asyncAddOpportunity = createAsyncThunk(
  'stall/addOpportunity',
  async (opportunity) => {
    const response = { ...opportunity, id: '555' };
    return response;
  }
);

export const asyncEditOpportunity = createAsyncThunk(
  'stall/editOpportunity',
  async (opportunity) => {
    const response = opportunity;
    return response;
  }
);

export const asyncDeleteOpportunity = createAsyncThunk(
  'stall/deleteOpportunity',
  async (id) => {
    return id;
  }
);

/* ------------------------------ Presentation ------------------------------ */
export const asyncAddPresentation = createAsyncThunk(
  'stall/addPresentation',
  async (opportunity) => {
    const response = { ...opportunity, id: '555' };
    return response;
  }
);

export const asyncEditPresentation = createAsyncThunk(
  'stall/editPresentation',
  async (opportunity) => {
    const response = opportunity;
    return response;
  }
);

export const asyncDeletePresentation = createAsyncThunk(
  'stall/deletePresentation',
  async (id) => {
    return id;
  }
);

/* ---------------------------------- Q & A --------------------------------- */
export const asyncPostQuestion = createAsyncThunk(
  'stall/postQuestion',
  async (question, thunkAPI) => {
    await new Promise((r) => setTimeout(r, 2000));
    return question;
  }
);

const initialState = {
  loading: false,
  questionLoading: false,
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

        const dominantColourObj = getDominantColour(payload.colour);
        state.bgColour = dominantColourObj.bgColour;
        state.textColour = dominantColourObj.textColour;
      })
      // Submitting a Question
      .addCase(asyncPostQuestion.pending, (state) => {
        state.questionLoading = true;
      })
      .addCase(asyncPostQuestion.fulfilled, (state, { payload }) => {
        state.questionLoading = false;
        state.qandas.push({
          id: '2223',
          question: payload,
          answer: '',
        });
      })
      // Adding a new Opportunity
      .addCase(asyncAddOpportunity.fulfilled, (state, { payload }) => {
        state.opportunities.push(payload);
      })
      .addCase(asyncEditOpportunity.fulfilled, (state, { payload }) => {
        const index = current(state.opportunities).findIndex(
          (opportunity) => opportunity.id === payload.id
        );
        state.opportunities[index] = payload;
      })
      .addCase(asyncDeleteOpportunity.fulfilled, (state, { payload }) => {
        state.opportunities = state.opportunities.filter(
          (opportunity) => opportunity.id !== payload
        );
      })
      // Presentation
      .addCase(asyncAddPresentation.fulfilled, (state, { payload }) => {
        state.events.push(payload);
      })
      .addCase(asyncEditPresentation.fulfilled, (state, { payload }) => {
        const index = current(state.events).findIndex(
          (event) => event.id === payload.id
        );
        state.events[index] = payload;
      })
      .addCase(asyncDeletePresentation.fulfilled, (state, { payload }) => {
        state.events = state.events.filter((event) => event.id !== payload);
      });
  },
});

export const { resetStall } = stallSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default stallSlice.reducer;
