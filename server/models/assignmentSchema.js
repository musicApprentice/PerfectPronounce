// import Atomic from './atomicSchema'; 


const mongoose = require('mongoose');

//once a lesson is created and used to create an assignment, the assignment will not be modified no matter what happens to the lesson
const assignmentSchema = new mongoose.Schema({
    lesson: {type: mongoose.Schema.ObjectId, ref: 'Lesson'},
    cardScores: [{type: mongoose.Schema.ObjectId, ref: "Grades"}],
    attemptScores: [{type: mongoose.Schema.ObjectId, ref: 'AttemptGrade'}],
    assignmentScores: [{type: mongoose.Schema.ObjectId, ref: "AssignmentScores"}],
    dueDate: {type: Date},
    class: {type: mongoose.Schema.ObjectId, ref: "Class"},
    minAttempts: {type: Number},
    goalAverage: {type: Number},
    scoringType: {type:String},
    lessonName: {type: String}

})
//

const Assignment = mongoose.model("assignment", assignmentSchema);
module.exports = Assignment;


/* 
Student A has assignment1

    Assignment1

        Dog Bark
        Cat Meow

        Highest Average of Last 1 attempts

        Goal average of 90 = 100% = A
    
    Student practices Dog card
    
    Attempt Grade comes in that you *have to save*
        const attemptGrade = new mongoose.Schema({
        transcription: {type: String},
        audio: {type: String},
        score: {type:Number},
        
        assignment: {type: mongoose.Schema.ObjectId, ref: "Assignment"},
        cardGrade: {type: mongoose.Schema.ObjectId, ref: "Grades"},
        student: {type: mongoose.Schema.ObjectId, ref: "User"}
})
    TODO: Save attempt to database (check out attemptGradeSchema above)
    req.field = assume these are there 
    TODO: Add it to the cardScore list
    
    TODO:Update cardScore itself for that student

    Dog
    Cat


    TODO:Update the assignment card = assignment score (if necessary)

    Assignment Score = Average of all card scores


*/
