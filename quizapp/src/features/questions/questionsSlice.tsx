import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../../models/questions";

const initalState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState: initalState,
  reducers: {
    fetchQuestions: (state, { payload }) => {
      state.questions = payload.results;
    },
  },
});

export const { fetchQuestions } = questionsSlice.actions;
export const allQuestions = (state: { questions: { questions: Question[] } }) =>
  state.questions.questions;
export default questionsSlice.reducer;
