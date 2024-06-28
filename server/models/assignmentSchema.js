const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    card: {type: Number, required: true},
    text:{type: String, required: true},
    translation:{type: String, require: true},
    audio:{type: String, require: true},
})

const assignment = mongoose.model("assignment", assignmentSchema);
module.exports = assignment;
