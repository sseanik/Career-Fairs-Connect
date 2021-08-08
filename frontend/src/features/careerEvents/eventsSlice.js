import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Career Fair Events
export const asyncFetchEventsData = createAsyncThunk(
  'events/careerFairs',
  async (token) => {
    const response = await axios({
      method: 'get',
      url: '/careerfairs/',
      // headers: {
      //   Authorization: `Token ${token}`,
      // },
    });

    const data = await response.data;

    return data;
  }
);

// Create a Career Fair Event
export const asyncCreateFairEvent = createAsyncThunk(
  'events/create',
  async ({ event, toast, id, university }) => {
    const response = await axios({
      method: 'post',
      url: `/university/${id}/careerfairs/`,
      data: event,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      toast({
        description: 'Successfully created Career Fair',
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        description: 'Login Failed',
        status: 'error',
        isClosable: true,
      });
    }

    const data = await response.data;
    return { data: data, university: university };
  }
);

// Delete a Career Fair Event
export const asyncDeleteFairEvent = createAsyncThunk(
  'events/delete',
  async ({ eventID, toast }) => {
    const response = await axios({
      method: 'delete',
      url: `/careerfairs/delete/${eventID}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      toast({
        description: 'Successfully deleted event',
        status: 'success',
        isClosable: true,
      });
    }

    return parseInt(eventID);
  }
);

const initialState = {
  loading: false,
  status: false,
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
      // Fetch Career Fair Events
      .addCase(asyncFetchEventsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncFetchEventsData.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.events = payload;
      })
      // Create a Career Fair Event
      .addCase(asyncCreateFairEvent.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncCreateFairEvent.fulfilled, (state, { payload }) => {
        state.status = false;
        state.events.push({
          id: payload.data.event_id,
          title: payload.data.title,
          description: payload.data.description,
          university: payload.university,
          logo: payload.data.logo,
          start: new Date(payload.data.start_date),
          end: new Date(payload.data.end_date),
        });
      })
      // Deleting a Career Fair Event
      .addCase(asyncDeleteFairEvent.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncDeleteFairEvent.fulfilled, (state, { payload }) => {
        state.status = false;
        state.events = state.events.filter((event) => event.id !== payload);
      });
  },
});

export const { resetEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
