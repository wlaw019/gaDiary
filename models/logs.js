// require mongoose
const mongoose = require("mongoose");

// new log schema
const logSchema = new mongoose.Schema({
    week:  Number,
    weekday:  Number,
    title:  String,
    descriptions:  String,
    feeling:  Number,
    classHrs: Number,
    homeworkHrs:  Number,
    vent:  String
});

// create a collection
const Log = mongoose.model("Log", logSchema);

module.exports = Log;
