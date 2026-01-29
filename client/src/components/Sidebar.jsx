import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../Context";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={10} sx={{ p: 3, border: "2px solid black" }}>
        <form noValidate autoComplete="off">
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
            
            {/* Account Info */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Account Info
              </Typography>

              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Assignment />}
                  fullWidth
                >
                  Copy Your ID: {me}
                </Button>
              </CopyToClipboard>
            </Box>

            {/* Call Controls */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Make a call
              </Typography>

              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<PhoneDisabled />}
                  fullWidth
                  onClick={leaveCall}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Phone />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                >
                  Call
                </Button>
              )}
            </Box>
          </Box>
        </form>

        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
