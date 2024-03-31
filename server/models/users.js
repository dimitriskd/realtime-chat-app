const mongoose = require("mongoose");
const md5 = require("md5");

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    required: false,
    default: function() {
      const emailHash = md5(this.email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
    }
  },
  last_active: { type: Date, default: Date.now }, // Set default value to current date
  status: { 
    type: String, 
    enum: ["online", "offline", "away"], 
    default: "offline" // Set default value to "offline"
  },
  blocked_users: [{ type: String }],
  conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
