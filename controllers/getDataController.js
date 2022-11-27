const { Users } = require("../models");
const passport = require("../lib/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { param } = require("../router");

module.exports = {
  dataUser: async (req, res) => {
    const datas = await Users.findAll();
    res.send(datas);
  },
};
