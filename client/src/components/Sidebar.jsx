import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../Context";
import Chat from "./Chat";

const Sidebar = () => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={10}
        sx={{
          p: 3,
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          height: "80vh", // Make sidebar tall
          minWidth: 350,  // ensures sidebar is not too narrow
        }}
      >
        {/* Account Info */}
        <Box mb={3}>
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
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Make a Call
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

        {/* Chat Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Chat />
        </Box>
      </Paper>
    </Container>
  );
};

export default Sidebar;
