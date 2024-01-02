import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../features/questions/questionsSlice";

const getQuestions = () => {
  //const dispatch = useDispatch();
  const options = {
    method: "GET",
    url: "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium",
  };

  axios
    .request(options)
    .then((res) =>
      //dispatch(fetchQuestions(res.data)
      console.log(res)
    )
    .catch(function (error) {
      console.error(error);
    });
};

export default getQuestions;
