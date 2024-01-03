import {
  Box,
  Button,
  MobileStepper,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "./QuestionComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { BaseSyntheticEvent, useEffect } from "react";
import {
  allQuestions,
  fetchQuestions,
  resetQuestions,
} from "../../features/questions/questionsSlice";
import axios from "axios";
import { setIsLoading } from "../../features/progress/progressSlice";
import {
  clearSelections,
  getAllSelections,
} from "../../features/selections/selectionSlice";
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
  isChosen: boolean;
}

export interface AnswerBundle {
  id: number;
  answer: string;
}

const QuestionComponent = () => {
  const dispatch = useDispatch();
  const selections = useSelector(getAllSelections);
  const questionsSize = 10;
  const [questionBundle, setQuestionBundle] = React.useState<QuestionBundle[]>(
    []
  );
  const [answerBundle, setAnswerBundle] = React.useState(new Map());
  const [activeStep, setActiveStep] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);

  const questions: Question[] = useSelector(allQuestions);
  console.log(questions);
  const maxSteps = questionBundle.length;

  useEffect(() => {
    if (selections.difficulty && selections.category) {
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
    var parsedQuestions = JSON.parse(JSON.stringify(questions));
    var quizQuestions: QuestionBundle[] = [];
    parsedQuestions.map((question: Question) => {
      var options = question.incorrect_answers;
      options.push(question.correct_answer);
      options.sort();
      let bundle: QuestionBundle = {
        type: question.type,
        difficulty: question.difficulty,
        category: question.category,
        question: question.question,
        correctAnswer: question.correct_answer,
        options: options,
        isChosen: false,
      };

      quizQuestions.push(bundle);
    });

    setQuestionBundle(quizQuestions);
  };

  const prepareAnswerBundle = (event: BaseSyntheticEvent) => {
    // if(answerBundle.get(activeStep) === event.target.textContent){
    //     setAnswerBundle(new Map(answerBundle.delete(activeStep)))

    // }

    setAnswerBundle(
      new Map(answerBundle.set(activeStep, event.target.textContent))
    );
  };

  const calculateScore = () => {
    var questionAnswerMap = new Map();
    answerBundle.forEach((value, key) => {
      if (questionBundle[key].correctAnswer === value) {
        questionAnswerMap.set(key, "Correct");
      }
    });

    setTotalScore(questionAnswerMap.size);
  };

  const replaceSpecialChars = (str: string) => {
    var str = str.replace(/&#39;/g, "'");
    var str = str.replace(/&#039;/g, "'");
    var str = str.replace(/&quot;/g, '"');
    var str = str.replace(/&ldquo;/g, "“");
    var str = str.replace(/&rdquo;/g, "”");

    return str;
  };

  const resetGame = () => {
    dispatch(clearSelections());
    dispatch(resetQuestions());
    setQuestionBundle([]);
    setActiveStep(0);
    setTotalScore(0);
    setAnswerBundle(new Map());
  };

  const questionStepper = questionBundle.length > 0 && (
    <Box className="stepperContainer">
      <Paper className="stepperHeader" square elevation={12}>
        <Typography>
          Answered {answerBundle.size}/{maxSteps}
        </Typography>
      </Paper>
      <Box className="stepperContent">
        <Typography
          className="questionPanel"
          variant="h6"
          sx={{ fontWeight: "700", fontSize: "1.5rem" }}
        >
          {replaceSpecialChars(questionBundle[activeStep].question)}
        </Typography>
        <div className="optionContainer">
          <div className="optionRow">
            <div
              className="option"
              onClick={prepareAnswerBundle}
              style={{
                backgroundColor:
                  answerBundle.get(activeStep) ===
                  questionBundle[activeStep].options[0]
                    ? "var(--selected-bg-color)"
                    : "",
              }}
            >
              {replaceSpecialChars(questionBundle[activeStep].options[0])}
            </div>
            <div
              className="option"
              onClick={prepareAnswerBundle}
              style={{
                backgroundColor:
                  answerBundle.get(activeStep) ===
                  questionBundle[activeStep].options[1]
                    ? "var(--selected-bg-color)"
                    : "",
              }}
            >
              {replaceSpecialChars(questionBundle[activeStep].options[1])}
            </div>
          </div>
          <div className="optionRow">
            <div
              className="option"
              onClick={prepareAnswerBundle}
              style={{
                backgroundColor:
                  answerBundle.get(activeStep) ===
                  questionBundle[activeStep].options[2]
                    ? "var(--selected-bg-color)"
                    : "",
              }}
            >
              {replaceSpecialChars(questionBundle[activeStep].options[2])}
            </div>
            <div
              className="option"
              onClick={prepareAnswerBundle}
              style={{
                backgroundColor:
                  answerBundle.get(activeStep) ===
                  questionBundle[activeStep].options[3]
                    ? "var(--selected-bg-color)"
                    : "",
              }}
            >
              {replaceSpecialChars(questionBundle[activeStep].options[3])}
            </div>
          </div>
          {totalScore > 0 && (
            <Typography className="correctAnswerPanel" variant="h6">
              Correct answer is : {questionBundle[activeStep].correctAnswer}
            </Typography>
          )}
        </div>
      </Box>
      <MobileStepper
        sx={{ borderRadius: "0px 0px 25px 25px" }}
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
      <div className="buttonsPanel">
        <Button
          className="buttons"
          onClick={calculateScore}
          disabled={activeStep != maxSteps - 1 || answerBundle.size != 10}
          sx={{
            backgroundColor: "var(--start-btn-color)",
            color: "var(--white-font-color)",
            width: "150px",
            margin: "20px",
            "&.Mui-disabled": {
              backgroundColor: "#94a36f",
              color: "#d3cdcd",
            },
          }}
        >
          Submit
        </Button>

        <Button
          className="buttons"
          onClick={resetGame}
          sx={{
            backgroundColor: "var(--start-btn-color)",
            color: "var(--white-font-color)",
            width: "150px",
            margin: "20px",
            "&.Mui-disabled": {
              backgroundColor: "#94a36f",
              color: "#d3cdcd",
            },
          }}
        >
          Reset game
        </Button>
      </div>
    </Box>
  );

  return (
    <div className="questionContainer">
      {totalScore > 0 && questionBundle.length > 0 && (
        <Paper square elevation={12}>
          <Typography variant="h4">
            You have scored {totalScore}/{maxSteps}
          </Typography>
        </Paper>
      )}
      {questionBundle.length > 0 && questionStepper}
    </div>
  );
};

export default QuestionComponent;
