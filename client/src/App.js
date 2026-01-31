import React from "react";
import { Typography, AppBar, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const useStyles = makeStyles({
  appBar: {
    borderRadius: 12,
    margin: "20px auto",
    padding: "10px 30px",
    maxWidth: "1100px",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "#fff",
  },
  wrapper: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: 20,
  },
  main: {
    display: "flex",
    gap: 20,
    maxWidth: "1200px",
    margin: "0 auto",
  },
  videoSection: {
    flex: 3, // 75%
  },
  chatSection: {
    flex: 2.5, // 25%
    // minWidth: 350,
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h4" align="center">
          Video Chat
        </Typography>
      </AppBar>

      {/* 👇 NEW FLEX ROW */}
      <Box className={classes.main}>
        {/* LEFT: VIDEO */}
        <Box className={classes.videoSection}>
          <VideoPlayer />
        </Box>

        {/* RIGHT: CHAT / SIDEBAR */}
        <Box className={classes.chatSection}>
          <Sidebar>
            <Notifications />
          </Sidebar>
        </Box>
      </Box>
    </div>
  );
};

export default App;
