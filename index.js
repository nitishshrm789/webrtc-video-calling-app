const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // allow all origins for testing
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server Running"));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Emit the unique ID to this client
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("end-call", () => {
    socket.broadcast.emit("call-ended");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
