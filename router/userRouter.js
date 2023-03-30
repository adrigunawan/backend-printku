"use strict";

const express = require("express");
const userRoutes = express.Router();
const { UserController } = require("../Controller/UserController");
const { Auth } = require("../Middleware/Auth");

userRoutes.get("/users", UserController.showAllUsers);
userRoutes.post("/register", UserController.newUser);
userRoutes.post("/login", UserController.loginController);
userRoutes.post("/check", UserController.checkUser);
userRoutes.get("/profile", Auth.Authenticate, UserController.ProfileController);

module.exports = { userRoutes };
