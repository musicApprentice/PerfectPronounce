// import Atomic from './atomicSchema'; 


const mongoose = require('mongoose');

//once a lesson is created and used to create an assignment, the assignment will not be modified no matter what happens to the lesson
const AssignmentScoresSchema = new mongoose.Schema({
    score: [{type: Number}],
    completed: [{type: Boolean}],
    cardsCompleted: [{type: Number}],
    totalCards: [{type: Number}],
    cardsLeft: {type: Number},

    student: {type: mongoose.Schema.ObjectId, ref: 'User'},
    assignment: {type: mongoose.Schema.ObjectId, ref: "Assignment"},

})
//

const AssignmentScores = mongoose.model("assignment", AssignmentScoresSchema);
module.exports = AssignmentScores;
