"use strict";

const bcrypt = require("bcrypt");

const hashPass = async (textPass) => {
  try {
    const salt = process.env.SALT;
    const hashedPass = await bcrypt.hash(textPass, +salt);
    return hashedPass;
  } catch (error) {
    throw new Error("Error Hashing Password", error);
  }
};

const verifyPass = (submitPass, dbPass) => {
  try {
    const match = bcrypt.compare(submitPass, dbPass);
    if (!match) {
      res.status(404).json({ message: "Passwords do not match" });
    }

    return match;
  } catch (error) {
    throw new Error("Error comparing:", error);
  }
};

module.exports = { hashPass, verifyPass };
