const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middlewares.js");

const UserController = require("../controllers/user.js");

router.route("/signup")
.get(UserController.renderSignUpForm)
.post(wrapAsync(UserController.SignUp));

router.route("/login")
.get(UserController.renderLoginPage)
.post(saveredirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    wrapAsync(UserController.Login));

router.get("/logout", UserController.Logout);

module.exports = router;