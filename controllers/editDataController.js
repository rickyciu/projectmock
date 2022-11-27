const { Users } = require("../models");
const passport = require("../lib/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { param } = require("../router");

module.exports = {
  editUser: async (req, res) => {
    const payload = req.body;
    const data = await Users.editprofile(payload);
    res.send(data);
  },
};
