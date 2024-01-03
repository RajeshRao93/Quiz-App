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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSelections,
  setCategorySelection,
  setDifficultySelection,
} from "../../features/selections/selectionSlice";
import "./SelectionComponent.css";

interface Categories {
  name: string;
  number: number;
}

const SelectionComponent = () => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const dispatch = useDispatch();
  const selections = useSelector(getAllSelections);

  useEffect(() => {
    if (selections.category === "" && selections.difficulty === "") {
      setCategory("");
      setDifficulty("");
    }
  }, [selections]);

  const FormBox = styled(Box)(() => ({
    width: "20vw",
    padding: "30px",
    color: "var(--white-font-color)",
  }));

  const TypeSelect = styled(Select)(() => ({
    backgroundColor: "var(--white-font-color)",
    borderRadius: "30px",
    fontFamily: "cursive",
    color: "var(--default-font-color)",
  }));

  const Label = styled(Typography)(() => ({
    fontFamily: "cursive",
    color: "var(--default-font-color)",
    fontWeight: "600",
  }));

  const categories: Categories[] = [
    { name: "General knowledge", number: 9 },
    { name: "Films", number: 11 },
    { name: "Computers", number: 18 },
    { name: "Sports", number: 21 },
  ];

  const difficulties: string[] = ["Easy", "Medium", "Hard"];

  const handleCategoryChange = (event: SelectChangeEvent<string | unknown>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setCategorySelection(
        typeof value === "string"
          ? categories.filter((x) => x.name === value)[0].number
          : ""
      )
    );

    setCategory(typeof value === "string" ? value : "");
  };

  const handleDifficultyChange = (
    event: SelectChangeEvent<string | unknown>
  ) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setDifficultySelection(
        typeof value === "string" ? value.toLowerCase() : ""
      )
    );

    setDifficulty(typeof value === "string" ? value : "");
  };

  const CategorySelection = (
    <FormBox className="selection">
      <FormControl fullWidth required>
        <Label variant="h6">Select the category for the quiz</Label>
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
    <FormBox className="selection">
      <FormControl fullWidth required>
        <Label variant="h6">Select the difficulty for the quiz</Label>
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
    <div className="quizOptions">
      {CategorySelection}
      {DifficultySelection}
    </div>
  );

  return <div>{SelectQuizOptionsCard}</div>;
};

export default SelectionComponent;
