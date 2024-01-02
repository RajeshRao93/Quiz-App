import axios from "axios";

export default axios.create({
  url: "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium",
});
