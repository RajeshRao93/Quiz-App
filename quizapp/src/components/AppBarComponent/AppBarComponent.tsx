import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./AppBarComponent.css";
import styled from "@emotion/styled";

export default function AppBarComponent() {
  const NavBar = styled(AppBar)(() => ({
    position: "relative",
    backgroundColor: "var(--bg-color)",
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "fantasy",
              color: "var(--default-font-color)",
            }}
          >
            Quizzapp
          </Typography>
        </Toolbar>
      </NavBar>
    </Box>
  );
}
