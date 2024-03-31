const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.router");
const ApiRateLimiter = require("./middleware/attempts.middleware");

dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongoDB
const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
//Login
app.use("/user", userRouter);

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${username}`,
    });
    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
