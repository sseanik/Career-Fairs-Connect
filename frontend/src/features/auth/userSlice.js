import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getUserDetails } from '../../exampleData/exampleUser';

export const asyncFetchUserData = createAsyncThunk(
  'user/details',
  async (token) => {
    const response = await axios({
      method: 'get',
      url: '/user/data/',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.data;

    return data;
  }
);

/* -------------------------------- Register -------------------------------- */
export const asyncRegisterUniversity = createAsyncThunk(
  'user/registerUniversity',
  async ({ user, toast }) => {
    const response = await axios({
      method: 'post',
      url: '/register/university/',
      data: user,
    });

    if (response.status === 200) {
      toast({
        description: 'Successfully created event',
        status: 'success',
        isClosable: true,
      });
    } else {
      toast({
        description: 'Register Failed',
        status: 'error',
        isClosable: true,
      });
    }

    const data = await response.data;

    return data;
  }
);

export const asyncRegisterCompany = createAsyncThunk(
  'user/registerCompany',
  async ({ user, toast }) => {
    const response = await axios({
      method: 'post',
      url: '/register/company/',
      data: user,
    });
    const data = await response.data;

    return data;
  }
);

export const asyncRegisterStudent = createAsyncThunk(
  'user/registerStudent',
  async ({ user, toast }) => {
    const response = await axios({
      method: 'post',
      url: '/register/student/',
      data: user,
    });
    const data = await response.data;

    return data;
  }
);

/* ---------------------------------- Login --------------------------------- */
export const asyncLoginUser = createAsyncThunk(
  'user/login',
  async ({ user, toast, history }) => {
    const response = await axios({
      method: 'post',
      url: '/login/',
      data: user,
    });
    const data = await response.data;

    if (response.status === 200) {
      localStorage.setItem('token', data.token);
    }

    history.push('/');
    return data;
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
        state.loggedIn = true;
        state.role = payload.user_type;
        state.email = payload.email;
        switch (payload.user_type) {
          case 'Student':
            state.fname = payload.first_name;
            state.lname = payload.last_name;
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
