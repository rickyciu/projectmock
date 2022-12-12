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
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: "dg1sb4tuf",
  api_key: "132382796296176",
  api_secret: "7VVJ1m-ffN8kEkruUN74qsZQmsk",
});
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
  })
);

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  const options = {
    colors: true,
  };

  try {
      const result = await cloudinary.api.resource(publicId, options);
      console.log(result);
      return result;
      } catch (error) {
      console.error(error);
  }
};

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

app.get("/profile", async (req, res) => {
  const publicId = 'Screenshot_2022-12-09_at_7.58.58_PM_a4hra6'
  const upload = await getAssetInfo(publicId);
  res.send({imageUrl: upload.secure_url, fullName: 'Alimuddin Hasan'});
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  const upload = await uploadImage(req.file.path);
  res.send(upload);
});

app.use(router);
const { send } = require("process");
// const { render } = require("ejs");
testConnection();

// app.get("/datauser", (req, res) => {
//   res.status(200).json(posts);
// });
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`example app listening at ${port}`));
