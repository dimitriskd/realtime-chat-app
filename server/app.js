const express = require("express");
const dotenv = require("dotenv");
const md5 = require("md5");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const Conversation = require("./models/conversations");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI;

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  });

// Route to handle POST request for creating a user
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
      avatar: `https://www.gravatar.com/avatar/${md5(
        email.trim().toLowerCase()
      )}?d=identicon`,
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

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (username !== "") {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({
          error: "Error logging in. Check username and password and try again.",
        });
    } else {
        if(bcrypt.compareSync(password, user.password)){
            return res.json({success: "success"});//here will return session token
        }
    }
  }
});

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
