///////////////////
// Dependencies
///////////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
// const db = mongoose.connection;
require("dotenv").config();


///////////////////
// Middleware
///////////////////
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


///////////////////
// Routers
///////////////////
const logsController = require("./controllers/logs.js");
app.use("/logs", logsController);


///////////////////
// Port
///////////////////
const PORT = process.env.PORT;

console.log(PORT);


///////////////////
// Database
///////////////////
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true}, () => {
  console.log("connected to mongoose");
});


///////////////////
// Listener
///////////////////
app.listen(PORT, () => {
  console.log("listening");
})
