///////////////////
// Dependencies
///////////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();



///////////////////
// Port
///////////////////
const PORT = process.env.PORT;

console.log(PORT);

///////////////////
// Database
///////////////////
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true});

///////////////////
// Middleware
///////////////////
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

///////////////////
// Routes
///////////////////
app.get("/", (req, res) => {
  res.send("Hello world");
})






///////////////////
// Listener
///////////////////
app.listen(PORT, () => {
  console.log("listening");
})
