import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const progressSlice = createSlice({
  name: "progress",
  initialState: initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setIsLoading } = progressSlice.actions;
export const getIsLoading = (state: { progress: { isLoading: boolean } }) =>
  state.progress.isLoading;
export default progressSlice.reducer;
