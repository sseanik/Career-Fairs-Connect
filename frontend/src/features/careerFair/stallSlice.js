import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const asyncPostQuestion = createAsyncThunk(
  'fair/postQuestion',
  async (question, thunkAPI) => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:${config.BACKEND_PORT}/admin/quiz/${quizid}`,
    //       {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     if (response.status === 200) {
    //       const foundQuestion = data.questions.filter((q) => q.id === id)[0];
    //       return foundQuestion;
    //     } else {
    //       return thunkAPI.rejectWithValue(data);
    //     }
    //   } catch (e) {
    //     console.log('Error', e.response.data);
    //     return thunkAPI.rejectWithValue(e.response.data);
    //   }
    // }
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
      });
  },
});

export const { resetStall } = stallSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default stallSlice.reducer;
