///////////////////
// dependencies
///////////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const session = require("express-session");


///////////////////
// middleware
///////////////////
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({secret: "feedmeseymour", resave: false, saveUninitialized: false}));


///////////////////
// routers
///////////////////
const logsController = require("./controllers/logs.js");
app.use("/logs", logsController);

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions",sessionsController);


///////////////////
// root route
///////////////////
app.get("/", (req, res) => {
  res.render("home.ejs");
})


///////////////////
// port
///////////////////
const PORT = process.env.PORT;

console.log(PORT);


///////////////////
// database
///////////////////
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true}, () => {
  console.log("connected to mongoose");
});


///////////////////
// listener
///////////////////
app.listen(PORT, () => {
  console.log("listening");
})
