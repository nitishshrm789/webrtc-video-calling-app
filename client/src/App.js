import React from "react";
import { Typography, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    "@media (max-width:600px)": {
      width: "90%",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h4" align="center">
          Video Chat
        </Typography>
      </AppBar>

      <VideoPlayer />

      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
