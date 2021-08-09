import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  async ({ user, toast, history }, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/user/register/university/',
        data: user,
      });
      toast({
        description: 'Successfully created account',
        status: 'success',
        isClosable: true,
      });
      history.push('/login');
      const data = await response.data;
      return data;
    } catch (error) {
      toast({
        description: error.response.data.email,
        status: 'error',
        isClosable: true,
      });
      return thunkAPI.rejectWithValue(error.response.data.email);
    }
  }
);

export const asyncRegisterCompany = createAsyncThunk(
  'user/registerCompany',
  async ({ user, toast, history }, thunkAPI) => {
    try {
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
        const data = await response.data;
        return data;
      }
    } catch (error) {
      toast({
        description: error.response.data.email,
        status: 'error',
        isClosable: true,
      });
      return thunkAPI.rejectWithValue(error.response.data.email);
    }
  }
);

export const asyncRegisterStudent = createAsyncThunk(
  'user/registerStudent',
  async ({ user, toast, history }, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/user/register/student/',
        data: user,
      });

      toast({
        description: 'Successfully created account',
        status: 'success',
        isClosable: true,
      });

      history.push('/login');
      const data = await response.data;
      return data;
    } catch (error) {
      toast({
        description: error.response.data.email,
        status: 'error',
        isClosable: true,
      });
      return thunkAPI.rejectWithValue(error.response.data.email);
    }
  }
);

/* ---------------------------------- Login --------------------------------- */
export const asyncLoginUser = createAsyncThunk(
  'user/login',
  async ({ user, toast, history }, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/user/login/',
        data: user,
      });

      toast({
        description: 'Successfully logged in',
        status: 'success',
        isClosable: true,
      });

      const data = await response.data;
      localStorage.setItem('token', data.token);
      history.push('/');
      return;
    } catch (error) {
      toast({
        description: error.response.data.non_field_errors[0],
        status: 'error',
        isClosable: true,
      });
      return thunkAPI.rejectWithValue(error.response.data.non_field_errors[0]);
    }
  }
);

export const asyncLogout = createAsyncThunk(
  'user/logout',
  async ({ token, history }) => {
    const response = await axios({
      method: 'get',
      url: '/user/logout/',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
      history.push('/landing');
    }
    const data = await response.data;

    return data;
  }
);

/* -------------------------------- Update -------------------------------- */
export const asyncUpdateUniversity = createAsyncThunk(
  'user/updateUniversity',
  async ({ id, user, toast, history }, thunkAPI) => {
    const response = await axios({
      method: 'put',
      url: `/university/${id}/`,
      data: user,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
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
  async ({ id, user, toast, history }, thunkAPI) => {
    const response = await axios({
      method: 'put',
      url: `/company/${id}/`,
      data: user,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
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
  async ({ id, user, toast, history }, thunkAPI) => {
    const response = await axios({
      method: 'put',
      url: `/student/${id}/`,
      data: user,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.data;

    if (response.status === 200) {
      history.push('/student');
    } else {
      toast({
        description: 'Failed to save',
        status: 'error',
        isClosable: true,
      });
    }

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
  wam: '',
  degree: '',
  // Common to Company and University
  name: '',
  description: '',
  website: '',
  logo: '',
  // University
  universityID: null,
  companyID: null,
  studentID: null,
  userID: null,
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
        state.userID = payload.user_id;
        switch (payload.user_type) {
          case 'Student':
            state.fname = payload.first_name;
            state.lname = payload.last_name;
            state.university = payload.university;
            state.studentID = payload.student_id;
            state.wam = payload.wam;
            state.degree = payload.degree;
            state.logo = payload.student_logo_64;
            break;
          case 'Company':
            state.companyID = payload.company_id;
            //
            state.name = payload.company_name;
            state.id = payload.company_id;
            state.description = payload.company_description;
            state.website = payload.company_webpage_url;
            state.logo = payload.company_logo_64;
            state.companyID = payload.company_id;
            break;
          case 'University':
            state.universityID = payload.university_id;
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
      // Rejected Registers
      .addCase(asyncRegisterUniversity.rejected, (state) => {
        state.status = false;
      })
      .addCase(asyncRegisterCompany.rejected, (state) => {
        state.status = false;
      })
      .addCase(asyncRegisterStudent.rejected, (state) => {
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
        state.role = '';
      })
      // rejected
      .addCase(asyncLoginUser.rejected, (state) => {
        state.status = false;
      })
      // Profile Pending
      .addCase(asyncUpdateUniversity.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncUpdateCompany.pending, (state) => {
        state.status = true;
      })
      .addCase(asyncUpdateStudent.pending, (state) => {
        state.status = true;
      })
      // Profile Success
      .addCase(asyncUpdateUniversity.fulfilled, (state, { payload }) => {
        state.name = payload.university_name;
        state.logo = payload.university_logo_64;
        state.website = payload.university_site_url;
        state.status = false;
      })
      .addCase(asyncUpdateCompany.fulfilled, (state, { payload }) => {
        state.description = payload.company_description;
        state.logo = payload.company_logo_64;
        state.name = payload.company_name;
        state.website = payload.company_webpage_url;
        state.status = false;
      })
      .addCase(asyncUpdateStudent.fulfilled, (state, { payload }) => {
        state.fname = payload.first_name;
        state.lname = payload.last_name;
        state.university = payload.university;
        state.wam = payload.wam;
        state.degree = payload.degree;
        state.status = false;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
