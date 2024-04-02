const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.router");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from any origin
  credentials: true // Allow cookies to be sent in cross-origin requests
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//connect to mongoDB
const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/user", userRouter);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  // Handle chat messages
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    // Save message to MongoDB
    // Emit message to other clients
    io.emit("chat message", msg);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.error('Server failed to start:', err);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});