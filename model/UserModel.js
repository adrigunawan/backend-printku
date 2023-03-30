"use strict";

require("dotenv").config();

const { connectDB, connectSql } = require("../config/db");
const { hashPass, verifyPass } = require("../Helper/passEncrypt");

const jwt = require("jsonwebtoken");

class User {
  constructor(username, email, alamat, no_telp) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.alamat = alamat;
    this.no_telp = no_telp;
  }

  static async getUser(result) {
    const textQuery = "SELECT * FROM admin";
    try {
      const user = await connectSql(textQuery);
      result(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  static async ProfileModel(id) {
    const textQuery = `SELECT * FROM admin WHERE id = ?`;
    let userResult;
    try {
      let user = await connectSql(textQuery, [id]);
      result = new User(user[0].username, user[0].email);
      console.log(userResult);
      return userResult;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getUserByUsername(username) {
    const textQuery = `SELECT * FROM admin WHERE username = ?`;
    try {
      let userResult;
      let user = await connectSql(textQuery, [username]);
      userResult = user[0];
      // console.log(userResult.username, userResult.password);
      console.log(userResult);
      return userResult;
    } catch (error) {
      return error;
    }
  }

  static async LoginModel(username, password) {
    try {
      const user = await this.getUserByUsername(username);
      let hashedToken;

      if (user) {
        hashedToken = user.password;
        console.log(hashedToken);
        const valid = await verifyPass(password, hashedToken);

        if (!valid) {
          return {
            user: false,
            valid,
            token: null,
            message: "Password salah",
          };
        }

        if (valid) {
          const token = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_KEY);
          return {
            user: true,
            valid,
            token,
            message: "Welcome....",
          };
        }
      }
      if (!user) {
        return {
          user: false,
          message: "User not found",
        };
      }
    } catch (error) {
      return error;
    }
  }

  static async createNewUser(username, password, email, alamat, no_telp) {
    const textQuery = "INSERT INTO admin (username, password, email, alamat, no_telp) VALUES (?, ?, ?, ?, ?)";
    try {
      let hashingPass = await hashPass(password);
      let user = await connectSql(textQuery, [username, hashingPass, email, alamat, no_telp]);

      if (user) {
        return "User berhasil ditambahkan";
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = { User };
