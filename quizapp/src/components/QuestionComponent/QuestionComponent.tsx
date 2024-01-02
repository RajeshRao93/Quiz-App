import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import "./QuestionComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  allQuestions,
  fetchQuestions,
} from "../../features/questions/questionsSlice";
import axios from "axios";
import { setIsLoading } from "../../features/progress/progressSlice";
import { getAllSelections } from "../../features/selections/selectionSlice";
import React from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Question } from "../../models/questions";

export interface QuestionBundle {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

const QuestionComponent = () => {
  const dispatch = useDispatch();
  const selections = useSelector(getAllSelections);
  const questionsSize = 10;
  const [activeStep, setActiveStep] = React.useState(0);
  const questionBundles: QuestionBundle[] = [];
  const questions: Question[] = useSelector(allQuestions);
  console.log(questions);

  const steps = [
    {
      label: "Select campaign settings",
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
  const maxSteps = questionBundles.length;

  useEffect(() => {
    if (selections.difficulty) {
      dispatch(setIsLoading(true));
      axios
        .get(
          `https://opentdb.com/api.php?&type=multiple&amount=${questionsSize}&category=${selections.category}&difficulty=${selections.difficulty}`
        )
        .then((res) => {
          dispatch(fetchQuestions(res.data));
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [selections]);

  useEffect(() => {
    if (questions.length > 0) {
      prepareQuestions(questions);
    }
  }, [questions]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const prepareQuestions = (questions: Question[]) => {
    var a = JSON.parse(JSON.stringify(questions));
    questions.map((question: Question) => {
      var options = question.incorrect_answers;
      options.push(question.correct_answer);
      //console.log(question.incorrect_answers.push(question.correct_answer));
      let bundle: QuestionBundle = {
        type: question.type,
        difficulty: question.difficulty,
        category: question.category,
        question: question.question,
        correctAnswer: question.correct_answer,
        options: options,
      };

      questionBundles.push(bundle);
    });

    console.log(questionBundles);
  };

  const question = (
    <Typography className="questionPanel" variant="h6">
      1) Remove/cleanup unwanted css, 2) use transform perspective animated
      texts, 3) watch css nesting video
    </Typography>
  );

  const multiOptions = (
    <div className="optionContainer">
      <div className="optionRow">
        <div className="option">Option1</div>
        <div className="option">Option2</div>
      </div>
      <div className="optionRow">
        <div className="option">Option3</div>
        <div className="option">Option4</div>
      </div>
    </div>
  );

  const questionStepper = (
    <Box className="stepperContainer">
      <Paper className="stepperHeader" square elevation={0}>
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box className="stepperContent">
        {question}
        {multiOptions}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );

  return (
    <div className="questionContainer">
      {questionBundles.length > 0 && questionStepper}
    </div>
  );
};

export default QuestionComponent;
