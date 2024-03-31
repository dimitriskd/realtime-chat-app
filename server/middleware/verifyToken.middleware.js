const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await User.findByToken(token);
    if (!user) {
      throw new Error("Unauthorized");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = VerifyToken;
