const User = require("../models/users");

const profileController = async (req, res) => {
  try {
    // Assuming you have a user ID available in the request object
    const userId = req.userId; // Assuming userId is available in req object, adjust this based on your actual implementation

    // Fetch user details from the database
    const user = await User.findById(userId);

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
