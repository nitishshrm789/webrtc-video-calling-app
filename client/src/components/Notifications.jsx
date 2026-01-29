import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";

import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call?.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h6">
            {call.name} is calling:
          </Typography>

          <Button variant="contained" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
