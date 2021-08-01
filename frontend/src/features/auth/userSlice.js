import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserDetails } from './exampleUser';

export const asyncFetchUserData = createAsyncThunk(
  'user/details',
  async (token) => {
    const response = await getUserDetails(token);
    return response;
  }
);

const initialState = {
  loading: false,
  // Common to all roles
  role: '',
  email: '',
  // Student
  fname: '',
  lname: '',
  university: '',
  // Common to Company and University
  name: '',
  description: '',
  website: '',
  logo: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncFetchUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.role = payload.role;
        state.email = payload.email;
        switch (payload.role) {
          case 'Student':
            state.fname = payload.fname;
            state.lname = payload.lname;
            state.university = payload.university;
            break;
          case 'Company':
            state.name = payload.name;
            state.description = payload.description;
            state.website = payload.website;
            state.logo = payload.logo;
            break;
          case 'University':
            state.name = payload.name;
            state.description = payload.description;
            state.website = payload.website;
            state.logo = payload.logo;
            break;
          default:
            break;
        }
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
