import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Resizer from 'react-image-file-resizer';

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      'PNG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });

export const convertImageToBase64 = createAsyncThunk(
  'logo/convertImage',
  async (e) => {
    const image = await resizeFile(e.target.files[0]);
    return image;
  }
);

export const logoSlice = createSlice({
  name: 'logo',
  initialState: {
    image: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(convertImageToBase64.fulfilled, (state, action) => {
      state.image = action.payload;
    });
  },
});

export const selectBase64Image = (state) => state.logo.image;

export default logoSlice.reducer;
