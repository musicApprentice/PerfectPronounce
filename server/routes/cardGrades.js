const express = require('express')
const router = express.Router();

module.exports = router;
//This is the route where we handle grades being updated, we directly update the grade and it will update in all the right places

/*
Use case for POST:

The user wants to insert and store a new attempt
Therefore an attemptGrade comes through:


const attemptGrade = new mongoose.Schema({
    transcription: {type: String},
    audio: {type: String},
    cardGrade: {type: mongoose.Schema.ObjectId, ref: "Grades"},
    student: {type: mongoose.Schema.ObjectId, ref: "User"}
})

so we insert the cardGrade into its own collection
then we use the cardGradeId to insert the reference into the right place for the student which will be automatically updated with a GET 


then we have to update the average field and attempt field of the cardGrade itself which will be easy because we have the gradeCard already



*/

/*
Use case for GET:

PASS
The user wants to get their cardGrades, but we will simply return these with the assignments and use a filter to get the user data


*/

/*
Use case for DELETE:

PASS
The user will never be allowed to delete cardGrades individually, they will only be deleted by the entire assignment being deleted


*/