const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [128, "Password must be less than 128 characters long"],
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    required: false,
    default: `https://api.dicebear.com/8.x/thumbs/svg?seed=${this.username}`,
  },
  last_active: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["online", "offline", "away"],
    default: "offline",
  },
  blocked_users: [{ type: String }],
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
});

// Hash password before saving to database
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Compare password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Increment login count when user logs in
userSchema.methods.incrementLoginCount = async function () {
  this.loginCount += 1;
  return await this.save();
};

userSchema.methods.statusOnline = async function () {
  this.status = "online";
  return await this.save();
};
userSchema.methods.statusOffline = async function () {
  this.status = "offline";
  return await this.save();
};

// Generate a JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.statics.findByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// Separate module for password validation
module.exports.validatePassword = function (password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
  return regex.test(password);
};

// Separate module for rate limiting
module.exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again later",
});
