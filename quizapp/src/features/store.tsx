import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questions/questionsSlice";
import progressReducer from "./progress/progressSlice";
import selectionReducer from "./selections/selectionSlice";

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    progress: progressReducer,
    selections: selectionReducer,
  },
});

export default store;
