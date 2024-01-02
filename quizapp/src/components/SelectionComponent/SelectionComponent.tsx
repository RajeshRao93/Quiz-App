import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelections } from "../../features/selections/selectionSlice";

interface Categories {
  name: string;
  number: number;
}

const SelectionComponent = () => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const dispatch = useDispatch();

  const FormBox = styled(Box)(() => ({
    width: "20vw",
    paddingTop: "30px",
    color: "var(--white-font-color)",
  }));

  const TypeSelect = styled(Select)(() => ({
    color: "var(--black-font-color)",
    backgroundColor: "var(--white-font-color)",
  }));

  const StartButton = styled(Button)(() => ({
    backgroundColor: "var(--start-btn-color)",
    marginTop: "30px",
    "&:hover": {
      backgroundColor: "var(--start-btn-color)",
    },
    "&.Mui-disabled": {
      backgroundColor: "#94a36f",
      color: "#d3cdcd",
    },
  }));

  const categories: Categories[] = [
    { name: "General knowledge", number: 9 },
    { name: "Films", number: 11 },
    { name: "Computers", number: 18 },
    { name: "Sports", number: 21 },
  ];

  const difficulties: string[] = ["Easy", "Medium", "Hard"];

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof category | unknown>
  ) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value : "");
  };

  const handleDifficultyChange = (
    event: SelectChangeEvent<typeof category | unknown>
  ) => {
    const {
      target: { value },
    } = event;
    setDifficulty(typeof value === "string" ? value : "");
  };

  const updateSelections = () => {
    const selections = {
      category: categories.filter((x) => x.name === category)[0].number,
      difficulty: difficulty.toLowerCase(),
    };
    dispatch(setSelections(selections));
    setQuizStarted(true);
  };

  const quizCanStart: boolean = category != "" && difficulty != "";

  const CategorySelection = (
    <FormBox>
      <FormControl fullWidth required disabled={quizStarted}>
        <Typography variant="h6">Select the category for the quiz.</Typography>
        <TypeSelect
          id="demo-simple-select"
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TypeSelect>
      </FormControl>
    </FormBox>
  );

  const DifficultySelection = (
    <FormBox>
      <FormControl fullWidth required disabled={quizStarted}>
        <Typography variant="h6">
          Select the difficulty for the quiz.
        </Typography>
        <TypeSelect
          id="demo-simple-select"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          {difficulties.map((difficulty) => (
            <MenuItem key={difficulty} value={difficulty}>
              {difficulty}
            </MenuItem>
          ))}
        </TypeSelect>
      </FormControl>
    </FormBox>
  );

  const SelectQuizOptionsCard = (
    <div>
      {CategorySelection}
      {DifficultySelection}
      <StartButton
        variant="contained"
        size="large"
        disabled={!quizCanStart || quizStarted}
        onClick={updateSelections}
      >
        Start the quiz
      </StartButton>
    </div>
  );

  return <div>{SelectQuizOptionsCard}</div>;
};

export default SelectionComponent;
