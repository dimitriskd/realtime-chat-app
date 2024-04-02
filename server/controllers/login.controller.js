const User = require("../models/users");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = user.generateAuthToken();
    await user.incrementLoginCount();
    await user.statusOnline();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    setTimeout(() => {
      res.status(200).json({ message: "Login successful", status: 1 });
    }, 2000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = login;

