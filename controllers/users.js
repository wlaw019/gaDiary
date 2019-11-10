const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js")

router.get("/new", (req, res) => {
  res.render("users/new.ejs")
})

router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.send("User name taken");
    } else {
      req.session.username = createdUser.username;
      res.redirect("/logs")
    }

  })
})




module.exports = router;
