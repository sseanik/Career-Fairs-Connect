import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setWindowWidth: (state, { payload }) => {
      state.width = payload;
    },

    setWindowHeight: (state, { payload }) => {
      state.height = payload;
    },
  },
});

export const { setWindowWidth, setWindowHeight } = windowSlice.actions;

export default windowSlice.reducer;
