///////////////////
// dependencies
///////////////////
const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");
const logSeed = require('../models/seed.js')


///////////////////
// middleware
///////////////////
const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    return next();
  } else {
    res.redirect("/");
  }
}


///////////////////
// seed
///////////////////
router.get("/seed", (req, res) => {
  Log.create(logSeed, (error, seedData) => {
    res.redirect("/logs");
  })
})


///////////////////
// index
///////////////////
router.get("/", isAuthenticated, (req, res) => {
  Log.find({username:req.session.username}, (error, allLogs) => {
    res.render("app/index.ejs", {logs: allLogs, username:req.session.username});
  }).sort({week:1}).sort({weekday:1})
})


///////////////////
// edit
///////////////////
router.get("/:id/edit", isAuthenticated, (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("app/edit.ejs", {log: foundLog});
  })
})


///////////////////
// update
///////////////////
router.put("/:id", isAuthenticated, (req, res) => {
  if (req.body.feeling1==="on") {
    req.body.feeling=1;
  } else if (req.body.feeling2==="on") {
    req.body.feeling=2;
  } else if (req.body.feeling3==="on") {
    req.body.feeling=3;
  } else if (req.body.feeling4==="on") {
    req.body.feeling=4;
  } else if (req.body.feeling5==="on") {
    req.body.feeling=5;
  }

  let editLog = {
    username: req.session.username,
    week:  req.body.week,
    weekday:  req.body.weekday,
    title:  req.body.title,
    descriptions:  req.body.descriptions,
    feeling:  req.body.feeling,
    classHrs: req.body.classHrs,
    homeworkHrs:  req.body.homeworkHrs,
    vent:  req.body.vent
  }

  Log.findByIdAndUpdate(req.params.id, editLog, {new: true}, (error, updatedLog) => {
    res.redirect("/logs");
  })
})


///////////////////
// new
///////////////////
router.get("/new", isAuthenticated, (req, res) => {
  res.render("app/new.ejs");
})


///////////////////
// create
///////////////////
router.post("/", isAuthenticated, (req, res) => {
  if (req.body.feeling1==="on") {
    req.body.feeling=1;
  } else if (req.body.feeling2==="on") {
    req.body.feeling=2;
  } else if (req.body.feeling3==="on") {
    req.body.feeling=3;
  } else if (req.body.feeling4==="on") {
    req.body.feeling=4;
  } else if (req.body.feeling5==="on") {
    req.body.feeling=5;
  }

  let newLog = {
    username: req.session.username,
    week:  req.body.week,
    weekday:  req.body.weekday,
    title:  req.body.title,
    descriptions:  req.body.descriptions,
    feeling:  req.body.feeling,
    classHrs: req.body.classHrs,
    homeworkHrs:  req.body.homeworkHrs,
    vent:  req.body.vent
  }

  Log.create(newLog, (error, createdLog) => {
    res.redirect("/logs");
  })
})


///////////////////
// delete
///////////////////
router.delete("/:id", isAuthenticated, (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, deletedLog) => {
    res.redirect("/logs");
  })
})


///////////////////
// show
///////////////////
router.get("/:id", isAuthenticated, (req,res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("app/show.ejs", {log: foundLog});
  })
})

router.get("/chart/:week", isAuthenticated, (req,res) => {
  if (req.params.week==="overview") {
    Log.find({}, (error, allLogs) => {
      res.render("app/chart.ejs", {logs: allLogs, overview:true});
    }).sort({week:1}).sort({weekday:1})
  } else {
    Log.find({week:req.params.week}, (error, weekLog) => {
      res.render("app/chart.ejs", {logs: weekLog, overview:false});
    }).sort({weekday:1})
  }
})


///////////////////
// export module
///////////////////
module.exports = router;
