///////////////////
// dependencies
///////////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
// const db = mongoose.connection;
require("dotenv").config();


///////////////////
// middleware
///////////////////
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


///////////////////
// routers
///////////////////
const logsController = require("./controllers/logs.js");
app.use("/logs", logsController);


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
