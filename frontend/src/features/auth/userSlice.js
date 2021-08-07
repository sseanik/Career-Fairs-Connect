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

    console.log('dsasdasda' + JSON.stringify(data))

    return data;
  }
);

/* -------------------------------- Register -------------------------------- */
export const asyncRegisterUniversity = createAsyncThunk(
  'user/registerUniversity',
  async ({ user, toast, history }) => {
    const response = await axios({
      method: 'post',
      url: '/user/register/university/',
      data: user,
    });

    if (response.status === 201) {
      toast({
        description: 'Successfully created account',
        status: 'success',
        isClosable: true,
      });
      history.push('/login');
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
  async ({ user, toast, history }) => {
    const response = await axios({
      method: 'post',
      url: '/user/register/company/',
      data: user,
    });

    if (response.status === 201) {
      toast({
        description: 'Successfully created account',
        status: 'success',
        isClosable: true,
      });
      history.push('/login');
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

export const asyncRegisterStudent = createAsyncThunk(
  'user/registerStudent',
  async ({ user, toast, history }) => {
    const response = await axios({
      method: 'post',
      url: '/user/register/student/',
      data: user,
    });

    if (response.status === 201) {
      toast({
        description: 'Successfully created account',
        status: 'success',
        isClosable: true,
      });
      history.push('/login');
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

/* ---------------------------------- Login --------------------------------- */
export const asyncLoginUser = createAsyncThunk(
  'user/login',
  async ({ user, toast, history }) => {
    console.log('tell me Im logging in');
    const response = await axios({
      method: 'post',
      url: '/user/login/',
      data: user,
    });
    const data = await response.data;

    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      toast({
        description: 'Successfully logged in',
        status: 'success',
        isClosable: true,
      });
      history.push('/login');
    } else {
      toast({
        description: 'Login Failed',
        status: 'error',
        isClosable: true,
      });
    }

    history.push('/');
    return data;
  }
);

export const asyncLogout = createAsyncThunk(
  'user/logout',
  async ({ token, history }) => {
    // console.log('I WANT TO LOGOUT');

    const response = await axios({
      method: 'get',
      url: '/user/logout/',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      localStorage.removeItem('token');
      history.push('/');
    }
    const data = await response.data;

    return data;
  }
);

/* -------------------------------- Update -------------------------------- */
export const asyncUpdateUniversity = createAsyncThunk(
  'user/updateUniversity',
  async ({ id, user, toast, history }) => {
    const response = await axios({
      method: 'put',
      url: `/university/${id}/`,
      data: user,
    });

    if (response.status === 201) {
      history.push('/university');
    } else {
      toast({
        description: 'Failed to save',
        status: 'error',
        isClosable: true,
      });
    }

    const data = await response.data;

    return data;
  }
);

export const asyncUpdateCompany = createAsyncThunk(
  'user/updateCompany',
  async ({ id, user, toast, history }) => {
    const response = await axios({
      method: 'put',
      url: `/company/${id}/`,
      data: user,
    });

    if (response.status === 201) {
      history.push('/company');
    } else {
      toast({
        description: 'Failed to save',
        status: 'error',
        isClosable: true,
      });
    }

    const data = await response.data;

    return data;
  }
);

export const asyncUpdateStudent = createAsyncThunk(
  'user/updateStudent',
  async ({ id, user, toast, history }) => {
    const response = await axios({
      method: 'put',
      url: `/student/${id}/`,
      data: user,
    });

    if (response.status === 201) {
      history.push('/student');
    } else {
      toast({
        description: 'Failed to save',
        status: 'error',
        isClosable: true,
      });
    }

    const data = await response.data;

    return data;
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
  // University
  universityID: 0,
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
        console.log('checking')
        console.log(payload);
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
            state.name = payload.company_name;
            state.description = payload.company_description;
            state.website = payload.company_website;
            state.logo = payload.company_logo_64;
            break;
          case 'University':
            state.universityID = payload.university_id;
            //
            state.name = payload.university_name;
            state.website = payload.university_site_url;
            state.logo = payload.university_logo_64;
            // Missing
            state.description = payload.description;
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
        state.loggedIn = true;
        state.status = false;
      })
      .addCase(asyncLogout.fulfilled, (state) => {
        state.loggedIn = false;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
