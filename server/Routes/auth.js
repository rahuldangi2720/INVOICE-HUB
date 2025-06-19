const express = require("express");
const { UserSignup, UserSignin } = require("../Controllers/auth");
const authRouter = express.Router();

authRouter.post("/usersignup", UserSignup);
authRouter.post("/usersignin", UserSignin);

module.exports = authRouter;
