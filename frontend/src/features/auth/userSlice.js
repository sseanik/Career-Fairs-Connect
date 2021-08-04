import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getUserDetails } from '../../exampleData/exampleUser';

export const asyncFetchUserData = createAsyncThunk(
  'user/details',
  async (token) => {
    const response = await getUserDetails(token);
    return response;
  }
);

/* -------------------------------- Register -------------------------------- */
export const asyncRegisterUniversity = createAsyncThunk(
  'user/registerUniversity',
  async ({ user, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    return user;
  }
);

export const asyncRegisterCompany = createAsyncThunk(
  'user/registerCompany',
  async ({ user, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    return user;
  }
);

export const asyncRegisterStudent = createAsyncThunk(
  'user/registerStudent',
  async ({ user, toast }) => {
    await new Promise((r) => setTimeout(r, 3000));
    return user;
  }
);

/* ---------------------------------- Login --------------------------------- */
export const asyncLoginUser = createAsyncThunk(
  'user/login',
  async ({ user, toast, history }) => {
    await new Promise((r) => setTimeout(r, 3000));
    // axios
    //   .post('/login', {
    //     login: user.email,
    //     password: user.password,
    //   })
    //   .then(
    //     (response) => {
    //       console.log(response);
    //       localStorage.setItem('token', response.token);
    //       // Fake testing local info
    //       localStorage.setItem('token', 'fakeToken');
    //       history.push('/');
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    return;
  }
);

const initialState = {
  loggedIn: false,
  loading: false,
  status: false,
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
      })
      .addCase(asyncRegisterUniversity.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncRegisterUniversity.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(asyncRegisterCompany.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncRegisterCompany.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(asyncRegisterStudent.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncRegisterStudent.fulfilled, (state) => {
        state.status = false;
      })
      // login
      .addCase(asyncLoginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncLoginUser.fulfilled, (state) => {
        state.status = false;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
