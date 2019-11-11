const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js")


router.get("/new", (req, res) => {
  res.render("users/new.ejs", {failure: req.session.failure})
})


router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    if (error) {
      req.session.failure = "usernameTaken";
      res.redirect("/users/new");
    } else {
      req.session.username = createdUser.username;
      res.redirect("/logs")
    }
  })
})


module.exports = router;
