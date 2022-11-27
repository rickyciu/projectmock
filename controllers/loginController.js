const { Users } = require("../models");
const passport = require("../lib/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { param } = require("../router");

module.exports = {
    loggedIn: async (req, res) => {
      const payload = req.body;
      authenticatedUser = await Users.authenticate(payload);
      if (authenticatedUser.username) {
        res.send({
          username: authenticatedUser.username,
          token: authenticatedUser.token,
        });
      } else {
        res.send("data tidak ditemukan");
      }
    },
  };