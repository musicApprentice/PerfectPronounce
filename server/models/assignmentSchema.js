// import Atomic from './atomicSchema'; 


const mongoose = require('mongoose');

//once a lesson is created and used to create an assignment, the assignment will not be modified no matter what happens to the lesson
const assignmentSchema = new mongoose.Schema({
    lesson: {type: mongoose.Schema.ObjectId, ref: 'Lesson'},
    cardScores: [{type: mongoose.Schema.ObjectId, ref: "Grades"}],
    attemptScores: [{type: mongoose.Schema.ObjectId, ref: 'AttemptGrade'}],
    assignmentScores: [{type: mongoose.Schema.ObjectId, ref: "AssignmentScores"}],

    class: {type: mongoose.Schema.ObjectId, ref: "Class"},
    minAttempts: {type: Number},
    goalAverage: {type: Number},
    scoringType: {type:String},
    lessonName: {type: String}

})
//

const Assignment = mongoose.model("assignment", assignmentSchema);
module.exports = Assignment;
