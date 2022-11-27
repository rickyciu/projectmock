const { Users } = require("../models");
const passport = require("../lib/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { param } = require("../router");

module.exports = {
  registrasi: async (req, res) => {
    const createUser = await Users.register(req.body);
    res.send({
      id: createUser.id,
      username: createUser.email,
      email: createUser.username,
      password: createUser.password,
      skor: createUser.skor,
    });
  },
};
