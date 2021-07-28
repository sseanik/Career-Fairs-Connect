import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getBase64 = (file) => {
  return new Promise((resolve) => {
    // Make new FileReader
    let reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load something...
    reader.onload = () => {
      // Make a fileInfo Object
      resolve(reader.result);
    };
  });
};

export const convertImageToBase64 = createAsyncThunk(
  'logo/convertImage',
  async (e) => {
    const response = await getBase64(e.target.files[0]);
    return response;
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
