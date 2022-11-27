const { Users } = require("../models");
const passport = require("../lib/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { param } = require("../router");

module.exports = {
  dataUserId: async (req, res) => {
    const payload = req.params.id;
    const data = await Users.profile(payload);
    res.send(data);
  },
};
