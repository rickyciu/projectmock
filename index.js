const express = require("express");
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const { request } = require("http");
const app = express();
var cors = require("cors");
const session = require("express-session");
app.use(cors());
app.use(express.urlencoded());

app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash())
app.set("view engine", "ejs");

const router = require("./router");

app.use(express.static(path.join(__dirname, "assets")));
app.use(bodyParse.json());
app.use(express.json());

const sequelize = new Sequelize(
  "sigddhma",
  "sigddhma",
  "E2iZAResX7ZQU4JVSqbgLkeospTIX9Y2",
  {
    host: "rosie.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

app.use(router);
const { send } = require("process");
// const { render } = require("ejs");
testConnection();

// app.get("/datauser", (req, res) => {
//   res.status(200).json(posts);
// });
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`example app listening at ${port}`));
