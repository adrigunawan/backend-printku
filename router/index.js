"use strict";

const express = require("express");
const router = express.Router();
const { userRoutes } = require("./userRouter");
const { Controller } = require("../Controller/Controller");

router.get("/", Controller.landingPage);
router.use(userRoutes);

module.exports = { router };
