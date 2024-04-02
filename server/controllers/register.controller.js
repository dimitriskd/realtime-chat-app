const User = require("../models/users");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${username}`,
    });

    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = register;
