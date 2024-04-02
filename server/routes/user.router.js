const express = require("express");
const LoginController = require("../controllers/login.controller");
const LogoutController = require("../controllers/logout.controller");
const RegisterController = require("../controllers/register.controller");
const ProfileController = require("../controllers/profile.controller");
const ApiRateLimiter = require("../middleware/attempts.middleware");

const router = express.Router();

router.post("/login",  LoginController);
router.get("/logout",  LogoutController);
router.post("/register",  RegisterController);
router.get("/profile", ProfileController);

module.exports = router;
