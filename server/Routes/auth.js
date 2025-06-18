const express = require("express");
const { UserSignup, UserSignin } = require("../controllers/auth");
const authRouter = express.Router();

authRouter.post("/usersignup", UserSignup);
authRouter.post("/usersignin", UserSignin);

module.exports = authRouter;
