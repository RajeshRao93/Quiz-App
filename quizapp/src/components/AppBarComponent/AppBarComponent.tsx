import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./AppBarComponent.css";
import styled from "@emotion/styled";

export default function AppBarComponent() {
  const NavBar = styled(AppBar)(() => ({
    position: "relative",
    backgroundColor: getComputedStyle(document.body).getPropertyValue(
      "--bg-color"
    ),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontSize: 30 }}
          >
            Quizzapp
          </Typography>
        </Toolbar>
      </NavBar>
    </Box>
  );
}
