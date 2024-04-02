const User = require("../models/users");

const profileController = async (req, res) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // Fetch user details from the database using the token
    const user = await User.findByToken(token);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract necessary user details
    const { username, avatar, status } = user;

    // Return the user profile data
    res.json({ username, avatar, status });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = profileController;