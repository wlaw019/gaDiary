// require mongoose
const mongoose = require("mongoose");

// new log schema
const logSchema = new mongoose.Schema({
    week:  Number,
    weekday:  String,
    title:  String,
    descriptions:  String,
    feeling:  Number,
    homeworkHrs:  Number,
    vent:  String
});

// create a collection
const Log = mongoose.model("Log", logSchema);

module.exports = Log;
