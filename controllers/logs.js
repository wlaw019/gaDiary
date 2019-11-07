///////////////////
// dependencies
///////////////////
const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");
const logSeed = require('../models/seed.js')


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
router.get("/", (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render("app/index.ejs", {logs: allLogs});
  }).sort({week:1}).sort({weekday:1})
})

// router.get("/test",(req, res) => {
//   res.send("hello");
// })


///////////////////
// edit
///////////////////
router.get("/:id/edit", (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("app/edit.ejs", {log: foundLog});
  })
})


///////////////////
// update
///////////////////
router.put("/:id", (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("app/new.ejs");
})


///////////////////
// create
///////////////////
router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, deletedLog) => {
    res.redirect("/logs");
  })
})


///////////////////
// show
///////////////////
router.get("/:id", (req,res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("app/show.ejs", {log: foundLog});
  })
})






module.exports = router;
