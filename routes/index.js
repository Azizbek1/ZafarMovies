var express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      username,
      password: hash,
    });
    user
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  });
});

router.post("/authenticate",  function (req, res, next) {
  const { username, password } = req.body;

    User.findOne({ username }, (err, data) => {
      console.log(data);
    if (err) throw err;
    if (!data) {
      res.json({
        status: "TOPILMADI",
        message: "Kirish muoffiyaqtsiz",
      });
    } else {
      bcrypt.compare(password, data.password).then((resultat) => {
        if (!resultat) {
          res.json({
            status: false,
            message: "Foydalanuvchini paroli notogri",
          });
        } else {
          const payload = { username };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 720, // 12soat
          });
          res.json({
            status: "Token yaraldi Uraa TRUE",
            token,
          });
        }
      });
    }
  });
});

module.exports = router;
