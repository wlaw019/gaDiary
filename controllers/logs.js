///////////////////
// dependencies
///////////////////
const express = require("express");
const router = express.Router();
const Log = require("../models/logs.js");


///////////////////
// index
///////////////////
// seed
router.get("/logs/seed", (req, res) => {
  Log.create([
    {
      week:  1,
      weekday:  "MON",
      title:  "Intro",
      descriptions:  "Intro and Expectations, Navigating in the Terminal",
      feeling:  4,
      homeworkHrs:  3,
      vent:  "This is w01d01"
    },
    {
      week:  1,
      weekday:  "TUE",
      title:  "Github",
      descriptions:  "Git ad Github, Class Repo setup & practice",
      feeling:  3,
      homeworkHrs:  4,
      vent:  "This is w01d02"
    },
    {
      week:  1,
      weekday:  "WED",
      title:  "Loops",
      descriptions:  "Intro to Conditionals and Loops, Arrays & Iteration",
      feeling:  5,
      homeworkHrs:  2,
      vent:  "This is w01d03"
    },
    {
      week:  1,
      weekday:  "THUR",
      title:  "Flexbox",
      descriptions:  "Functions, Scope, Flexbox",
      feeling:  1,
      homeworkHrs:  5,
      vent:  "This is w01d04"
    },
    {
      week:  1,
      weekday:  "FRI",
      title:  "Objects",
      descriptions:  "Program design, Objects",
      feeling:  2,
      homeworkHrs:  3,
      vent:  "This is w01d05"
    },
    {
      week:  1,
      weekday:  "SAT",
      title:  "Homework",
      descriptions:  "Landscaper & Oscar",
      feeling:  3,
      homeworkHrs:  10,
      vent:  "This is w01d06"
    },
    {
      week:  1,
      weekday:  "SUN",
      title:  "Rest",
      descriptions:  "Taking a break",
      feeling:  5,
      homeworkHrs:  0,
      vent:  "This is w01d07"
    }
  ], (error, seedData) => {
    res.redirect("/logs");
  })
})

// index
router.get("/logs", (req, res) => {
  Log.find({}, (erro, allLogs) => {
    res.render("logs/index.ejs", {logs: allLogs});
  })
})

module.exports = router;
