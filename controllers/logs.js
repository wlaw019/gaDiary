///////////////////
// dependencies
///////////////////
const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");


///////////////////
// seed
///////////////////
router.get("/seed", (req, res) => {
  Log.create([
    {
      week:  1,
      weekday:  1,
      title:  "Intro",
      descriptions:  "Intro and Expectations, Navigating in the Terminal",
      feeling:  4,
      homeworkHrs:  3,
      vent:  "This is w01d01"
    },
    {
      week:  1,
      weekday:  2,
      title:  "Github",
      descriptions:  "Git ad Github, Class Repo setup & practice",
      feeling:  3,
      homeworkHrs:  4,
      vent:  "This is w01d02"
    },
    {
      week:  1,
      weekday:  3,
      title:  "Loops",
      descriptions:  "Intro to Conditionals and Loops, Arrays & Iteration",
      feeling:  5,
      homeworkHrs:  2,
      vent:  "This is w01d03"
    },
    {
      week:  1,
      weekday:  4,
      title:  "Flexbox",
      descriptions:  "Functions, Scope, Flexbox",
      feeling:  1,
      homeworkHrs:  5,
      vent:  "This is w01d04"
    },
    {
      week:  1,
      weekday:  5,
      title:  "Objects",
      descriptions:  "Program design, Objects",
      feeling:  2,
      homeworkHrs:  3,
      vent:  "This is w01d05"
    },
    {
      week:  1,
      weekday:  6,
      title:  "Homework",
      descriptions:  "Landscaper & Oscar",
      feeling:  3,
      homeworkHrs:  10,
      vent:  "This is w01d06"
    },
    {
      week:  1,
      weekday:  7,
      title:  "Rest",
      descriptions:  "Taking a break",
      feeling:  5,
      homeworkHrs:  0,
      vent:  "This is w01d07"
    },{
      week:  2,
      weekday:  1,
      title:  "Object-ception",
      descriptions:  "Object-ception, Combining datatypes",
      feeling:  4,
      homeworkHrs:  3,
      vent:  "This is w02d01"
    },
    {
      week:  2,
      weekday:  2,
      title:  "Callbacks",
      descriptions:  "Callbacks, Array Methods with Call Backs",
      feeling:  3,
      homeworkHrs:  4,
      vent:  "This is w02d02"
    },
    {
      week:  2,
      weekday:  3,
      title:  "OOP",
      descriptions:  "Object methods, Classes",
      feeling:  5,
      homeworkHrs:  2,
      vent:  "This is w02d03"
    },
    {
      week:  2,
      weekday:  4,
      title:  "Spacebattle",
      descriptions:  "Media Queries, Spacebattle",
      feeling:  1,
      homeworkHrs:  5,
      vent:  "This is w02d04"
    },
    {
      week:  2,
      weekday:  5,
      title:  "DOM",
      descriptions:  "DOM Intro, jQuery",
      feeling:  2,
      homeworkHrs:  3,
      vent:  "This is w02d05"
    },
    {
      week:  2,
      weekday:  6,
      title:  "Homework",
      descriptions:  "Harry Potter jQuery Magic",
      feeling:  3,
      homeworkHrs:  10,
      vent:  "This is w02d06"
    },
    {
      week:  2,
      weekday:  7,
      title:  "Rest",
      descriptions:  "Taking a break",
      feeling:  5,
      homeworkHrs:  0,
      vent:  "This is w02d07"
    }
  ], (error, seedData) => {
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
    homeworkHrs:  req.body.homeworkHrs,
    vent:  req.body.vent
  }

  Log.create(newLog, (error, createdLog) => {
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
