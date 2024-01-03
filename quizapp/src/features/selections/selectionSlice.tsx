import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selections: {
    category: "",
    difficulty: "",
  },
};

const selectionSlice = createSlice({
  name: "selections",
  initialState: initialState,
  reducers: {
    setCategorySelection: (state, { payload }) => {
      state.selections.category = payload;
    },
    setDifficultySelection: (state, { payload }) => {
      state.selections.difficulty = payload;
    },
    clearSelections: (state) => {
      state.selections = initialState.selections;
    },
  },
});

export const { setCategorySelection } = selectionSlice.actions;
export const { setDifficultySelection } = selectionSlice.actions;
export const { clearSelections } = selectionSlice.actions;
export const getAllSelections = (state: {
  selections: { selections: { category: string; difficulty: string } };
}) => state.selections.selections;
export default selectionSlice.reducer;
