import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { SocketContext } from "../Context";

const Chat = () => {
  const { messages, sendMessage, callAccepted } = useContext(SocketContext);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Show chat only after call connects (optional – enable if you want)
  // if (!callAccepted) return null;

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 3,
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>

      {/* Messages Area */}
      <Box
        sx={{
          height: 220,
          overflowY: "auto",
          mb: 2,
          px: 1,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: msg.from === "Me" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor:
                  msg.from === "Me" ? "#1976d2" : "#e0e0e0",
                color: msg.from === "Me" ? "#fff" : "#000",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!text.trim()}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chat;
