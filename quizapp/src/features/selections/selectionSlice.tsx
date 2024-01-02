import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selections: {
    category: null,
    difficulty: null,
  },
};

const selectionSlice = createSlice({
  name: "selections",
  initialState: initialState,
  reducers: {
    setSelections: (state, { payload }) => {
      state.selections = payload;
    },
  },
});

export const { setSelections } = selectionSlice.actions;
export const getAllSelections = (state: {
  selections: { selections: { category: string; difficulty: string } };
}) => state.selections.selections;
export default selectionSlice.reducer;
