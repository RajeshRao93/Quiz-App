import { Box, Card } from "@mui/material";

import React from "react";
import "./QuizComponent.css";
import SelectionComponent from "../SelectionComponent/SelectionComponent";
import QuestionComponent from "../QuestionComponent/QuestionComponent";

const QuizComponent = () => {
  const QuizCard = (
    <React.Fragment>
      <div className="quizCard">
        <div className="selectionPanel">
          <SelectionComponent />
        </div>
        <div className="questionsPanel">
          <QuestionComponent />
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <Box>
      <Card
        className="card"
        variant="outlined"
        sx={{
          backgroundColor: "var(--bg-color)",
        }}
      >
        {QuizCard}
      </Card>
    </Box>
  );
};

export default QuizComponent;
