"use strict";

const { User } = require("../model/UserModel");

class UserController {
  static async showAllUsers(req, res) {
    try {
      const user = await User.getUser((data) => {
        res.status(200).json({
          message: "Hasil Data user",
          data,
        });
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async ProfileController(req, res, next) {
    const { userId } = req;
    try {
      const user = await User.ProfileModel(+userId);
      if (userId) {
        res.status(200).json({
          message: user,
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        title: "Data not found...",
        error,
      });
    }
  }

  static async loginController(req, res, next) {
    const { username, password } = req.body;
    try {
      const result = await User.LoginModel(username, password);
      if (result.token && result.valid) {
        res.header("token", result.token).status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async checkUser(req, res, next) {
    const { username } = req.body;
    try {
      const user = await User.getUserByUsername(username);
      if (user) {
        res.status(200).json({
          message: "User found",
          User: true,
        });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid username", User: false });
    }
  }

  static async newUser(req, res, next) {
    const { username, password, email, alamat, no_telp } = req.body;

    try {
      const user = await User.createNewUser(username, password, email, alamat, no_telp);
      res.status(201).json({
        message: user,
      });
      // console.log(user);
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = { UserController };
