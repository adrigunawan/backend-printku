"use strict";

class Controller {
  static landingPage(req, res, next) {
    res.send("Welcome Page");
    next();
  }
}

module.exports = { Controller };
