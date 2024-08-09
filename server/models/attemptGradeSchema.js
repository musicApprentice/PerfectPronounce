const mongoose = require("mongoose")

const attemptGrade = new mongoose.Schema({
    transcription: {type: String},
    audio: {type: String},
    score: {type:Number},
    
    assignment: {type: mongoose.Schema.ObjectId, ref: "Assignment"},
    cardGrade: {type: mongoose.Schema.ObjectId, ref: "Grades"},
    student: {type: mongoose.Schema.ObjectId, ref: "User"}
})

const AttemptGrade = mongoose.model("Atomic", attemptGrade);
module.exports = AttemptGrade;