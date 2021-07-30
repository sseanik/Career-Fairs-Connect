import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStallData } from './exampleCompanyStall';
import { prominent } from 'color.js';

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

const initialState = {
  loading: false,
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

        let index = -1;
        if (
          !isNaN(payload.colour[0][2]) &&
          payload.colour[0][0] + payload.colour[0][1] + payload.colour[0][2] !==
            0
        ) {
          index = 0;
        } else if (
          !isNaN(payload.colour[1][2]) &&
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
        } else {
          state.bgColour = 'black';
          state.textColour = 'white';
        }
      });
  },
});

export const { resetStall } = stallSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default stallSlice.reducer;
