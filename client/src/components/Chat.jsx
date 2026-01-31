import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SocketContext } from "../Context";

const Chat = () => {
  const { messages, sendMessage, callAccepted } = useContext(SocketContext);
  const [text, setText] = useState("");

  // if (!callAccepted) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">Chat</Typography>

      <Box
        sx={{
          height: 200,
          overflowY: "auto",
          border: "1px solid #ccc",
          p: 1,
          mb: 1,
        }}
      >
        {messages.map((msg, i) => (
          <Typography key={i} align={msg.from === "Me" ? "right" : "left"}>
            <strong>{msg.from}:</strong> {msg.text}
          </Typography>
        ))}
      </Box>

      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
