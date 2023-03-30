"use strict";

require("dotenv").config();

const jwt = require("jsonwebtoken");

class Auth {
  static Authenticate(req, res, next) {
    const { token } = req.headers;

    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

      req.userId = userId;
      next();
    } catch (error) {
      res.status(404).json({
        title: "Error",
        message: error,
      });

      console.log(error );
    }
  }
}

module.exports = { Auth };
