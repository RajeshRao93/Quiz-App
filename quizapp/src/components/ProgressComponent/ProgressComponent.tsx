import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../features/progress/progressSlice";
import styled from "@emotion/styled";

const ProgressComponent = () => {
  const isLoading = useSelector(getIsLoading);
  const visibility = isLoading ? "visible" : "hidden";

  const ProgressBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: "0.75",
    visibility: visibility,
  }));
  return (
    <div>
      <ProgressBox>
        <CircularProgress />
      </ProgressBox>
    </div>
  );
};

export default ProgressComponent;
