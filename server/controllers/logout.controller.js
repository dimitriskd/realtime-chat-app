const User = require("../models/users");

const logout = async (req, res) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // Fetch user details from the database using the token
    const user = await User.findByToken(token);
    user.statusOffline();

    // Clear the token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = logout;
