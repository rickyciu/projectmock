const passport = require("passport");
const { Users } = require("../models");

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "secret",
    },
    async (payload, done) => {
      Users.findByPk (payload.id)
      // console.log("payload jwt", payload);
      .then(user => {
        done(null, {
          id: user.id,
          username: user.username,
          skor: user.skor,
          email: user.email
        });

      })
    }
  )
);

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;
