const { Users } = require("../models");

module.exports = {
    updateScore: async (req, res) => {
      const updateScore = await Users.update({skor: req.body.skor}, {
        where: {
          id: req.body.id,
        }
      })
      res.send(updateScore)
    },
  };