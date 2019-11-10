const express = require("express");
const router = express.Router();
const User = require("../models/users.js")
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
})

router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (foundUser===null) {
      res.redirect("/sessions/new");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.username = foundUser.username;
        res.redirect("/logs")
      } else {
        res.redirect("/sessions/new");
      }
    }
  })
})

router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
