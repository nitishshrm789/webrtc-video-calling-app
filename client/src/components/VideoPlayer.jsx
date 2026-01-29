import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { SocketContext } from "../Context";

const useStyles = makeStyles({
  video: {
    width: "550px",
    "@media (max-width:600px)": {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    "@media (max-width:600px)": {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
});

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}

      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {call?.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
