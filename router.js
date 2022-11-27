const router = require("express").Router();
const passport = require("./lib/passport");
const registration = require("./controllers/regController");
const getData = require("./controllers/getDataController");
const login = require("./controllers/loginController")
const profile = require("./controllers/getDataIdController");
const edit = require("./controllers/editDataController.js");
const authenticate = require("./middleware/authenticate")
const updateData = require("./controllers/UpdateScore")


router.post("/register", registration.registrasi);
router.get("/datauser", getData.dataUser);
router.post("/login", login.loggedIn)
router.get("/profile/:id", profile.dataUserId)
router.post("/edit", edit.editUser);
router.get("/whoami", authenticate, (req, res) => {
    console.log("dah masuk")
    res.send(req.user)
})

router.put("/janken", authenticate, updateData.updateScore)

module.exports = router;
