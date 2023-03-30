"use strict";

const mysql = require("mysql");
const dbConfig = require("./db.config");

const connectDB = mysql.createConnection({
  host: dbConfig.HOST,
  user: "root",
  database: dbConfig.DB,
});

connectDB.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

const connectSql = (sql, params) => {
  return new Promise((resolve, reject) => {
    connectDB.query(sql, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { connectDB, connectSql };
