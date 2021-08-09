import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { prominent } from 'color.js';
import complementaryTextColour from '../../util/complementaryTextColour';
import axios from 'axios';

// Get Stall Data
export const asyncFetchStallData = createAsyncThunk(
  'stall/company',
  async ({ stallID }) => {
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

    const data = await response.data;
    return data;
  }
);

// Edit Job Opportunity
export const asyncEditOpportunity = createAsyncThunk(
  'stall/editOpportunity',
  async ({ stallID, opportunity, toast }) => {
    const response = await axios({
      method: 'put',
      url: `/company/${stallID}/opportunities/`,
      data: opportunity,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully edited Opportunity',
      status: 'success',
      isClosable: true,
    });
    const data = await response.data;
    return data;
  }
);

// Delete Job Opportunity
export const asyncDeleteOpportunity = createAsyncThunk(
  'stall/deleteOpportunity',
  async ({ companyID, jobID, toast }) => {
    console.log(companyID);
    console.log(jobID);

    await axios({
      method: 'delete',
      url: `/company/opportunities/${jobID}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully removed Opportunity',
      status: 'success',
      isClosable: true,
    });
    return jobID;
  }
);

/* ------------------------------ Presentation ------------------------------ */
// Add a presentation
export const asyncAddPresentation = createAsyncThunk(
  'stall/addPresentation',
  async ({ presentation, toast }) => {
    const response = await axios({
      method: 'post',
      url: '/presentation/create/',
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
    const data = await response.data;
    return data;
  }
);

// Edit a presentation
export const asyncEditPresentation = createAsyncThunk(
  'stall/editPresentation',
  async ({ presentation, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    const response = await axios({
      method: 'put',
      url: '/presentation/edit/',
      data: presentation,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully edited Presentation',
      status: 'success',
      isClosable: true,
    });
    const data = await response.data;
    return data;
  }
);

// Delete a presentation
export const asyncDeletePresentation = createAsyncThunk(
  'stall/deletePresentation',
  async ({ id, toast }) => {
    await axios({
      method: 'delete',
      url: `/presentation/delete/${id}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
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
  async ({ id, question, toast }) => {
    const response = await axios({
      method: 'post',
      url: `/questions/${id}/`,
      data: question,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully posted Question',
      status: 'success',
      isClosable: true,
    });
    return response.data;
  }
);

// Edit a question
export const asyncEditQuestion = createAsyncThunk(
  'stall/editQuestion',
  async ({ questionId, stallId, question, toast }) => {
    const response = await axios({
      method: 'put',
      url: `/questions/question/${stallId}/${questionId}/`,
      data: question,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully Edited Question',
      status: 'success',
      isClosable: true,
    });
    const data = await response.data;
    return data;
  }
);

// Add answer to a question
export const asyncAnswerQuestion = createAsyncThunk(
  'stall/answerQuestion',
  async ({ stallId, questionId, answer, toast }) => {
    const response = await axios({
      method: 'put',
      url: `/questions/answer/${stallId}/${questionId}/`,
      data: answer,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.data;
    return data;
  }
);

// Delete a question
export const asyncDeleteQuestion = createAsyncThunk(
  'stall/deleteQuestion',
  async ({ stallId, postId, toast }) => {
    await axios({
      method: 'delete',
      url: `/questions/question/${stallId}/${postId}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    toast({
      description: 'Successfully deleted Question',
      status: 'success',
      isClosable: true,
    });
    return postId;
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
  companyID: '',
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
        state.companyID = payload.companyID;
        state.title = payload.title;
        state.description = payload.description;
        state.logo = payload.logo;
        state.live = payload.live;
        state.website = payload.website;
        state.opportunities = payload.opportunities;
        state.events = payload.presentations;
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
        console.log(payload);
        state.opportunities.push({
          id: payload.job_id,
          type: payload.type,
          role: payload.role,
          location: payload.location,
          wam: payload.wam,
          expiry: payload.expiry,
          link: payload.application_link,
          description: payload.job_description,
        });
      })
      // Edit an opportunity
      .addCase(asyncEditOpportunity.pending, (state, { payload }) => {
        state.formStatus = 'Pending';
      })
      .addCase(asyncEditOpportunity.fulfilled, (state, { payload }) => {
        state.formStatus = 'Completed';

        console.log(payload);
        console.log(current(state).opportunities);

        const index = current(state.opportunities).findIndex(
          (opportunity) => opportunity.id === parseInt(payload.job_id)
        );
        state.opportunities[index] = {
          id: payload.job_id,
          type: payload.type,
          role: payload.role,
          location: payload.location,
          wam: payload.wam,
          expiry: payload.expiry,
          link: payload.application_link, // MISSING
          description: payload.job_description,
        };
      })
      // Delete an opportunity
      .addCase(asyncDeleteOpportunity.pending, (state, { payload }) => {
        state.formStatus = 'Pending';
      })
      .addCase(asyncDeleteOpportunity.fulfilled, (state, { payload }) => {
        console.log(payload);
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
        state.events.push({
          color: payload.color,
          description: payload.presentation_description,
          end: payload.end_time,
          link: payload.presentation_link,
          live: false,
          start: payload.start_time,
          title: payload.title,
          textColor: payload.textColor,
          id: payload.presentation_id,
        });
      })
      // Edit a Presentation
      .addCase(asyncEditPresentation.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncEditPresentation.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        const index = current(state.events).findIndex(
          (event) => event.id === parseInt(payload.presentation_id)
        );
        state.events[index] = {
          color: payload.color,
          description: payload.presentation_description,
          end: payload.end_time,
          id: payload.presentation_id,
          link: payload.presentation_link,
          live: false,
          start: payload.start_time,
          title: payload.title,
          textColor: payload.textColor,
        };
      })
      // Delete a Presentation
      .addCase(asyncDeletePresentation.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncDeletePresentation.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        state.events = state.events.filter(
          (event) => event.id !== parseInt(payload)
        );
      })
      /* ----------------------------------- Q&A ---------------------------------- */
      // Submitting a Question
      .addCase(asyncPostQuestion.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncPostQuestion.fulfilled, (state, { payload }) => {
        state.status = false;
        state.qandas.push(payload);
      })
      .addCase(asyncEditQuestion.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncEditQuestion.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        const index = current(state.qandas).findIndex(
          (question) => question.id === payload.post_id
        );
        state.qandas[index].question = payload.question;
      })
      .addCase(asyncAnswerQuestion.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncAnswerQuestion.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        const index = current(state.qandas).findIndex(
          (question) => question.id === payload.post_id
        );
        state.qandas[index].answer = payload.answer;
      })
      .addCase(asyncDeleteQuestion.pending, (state, { payload }) => {
        state.eventFormStatus = 'Pending';
      })
      .addCase(asyncDeleteQuestion.fulfilled, (state, { payload }) => {
        state.eventFormStatus = 'Completed';
        state.qandas = state.qandas.filter((qanda) => qanda.id !== payload);
      });
  },
});

export const { resetStall, resetFormStatus, resetEventFormStatus } =
  stallSlice.actions;

export default stallSlice.reducer;
