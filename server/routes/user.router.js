const express = require("express");
const LoginController = require("../controllers/login.controller");
const RegisterController = require("../controllers/register.controller");
const ProfileController = require("../controllers/profile.controller");
const ApiRateLimiter = require("../middleware/attempts.middleware");

const router = express.Router();

router.post("/login", ApiRateLimiter, LoginController);
router.post("/register", ApiRateLimiter, RegisterController);
router.get("/profile", ApiRateLimiter, ProfileController);

module.exports = router;
