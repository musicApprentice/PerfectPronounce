const Assignment = require("../models/assignmentSchema.js")
const CardGrade = require("../models/gradesSchema.js");
const Class = require("../models/classSchema.js")
const User = require('../models/userSchema.js')

const express = require('express');
const router = express.Router(); 


// Add assignment to class

  //TODO: Turn insert flashcard grades and insert assignment grades into function calls so this doesn't look so crazy
router.post('/', async (req, res) => {
    //Also want the req to have the flashcards so I don't need extra computation, call it flashcards
    console.log(req.body)
    let newAssignment = new Assignment({
        lesson: req.body.lesson_id,
        minAttempts: req.body.attempts,
        goalAverage: req.body.goalAverage,
        scoringType: req.body.scoringType,
        lessonName: req.body.lesson.name,
        class: req.body.course_id
    })
    const savedAssignment = await newAssignment.save()

    await Class.updateOne(
        {_id:{$in: savedAssignment.class}}, //match the class in the Class collection
        {$addToSet: {assignments: savedAssignment._id}} //insert the savedAssignment into the assignment field
    )

    const targetClass = await Class.findById(savedAssignment.class)

    //Add the assignment to every student's list
    await User.updateMany(
        {_id: {$in: targetClass.students}},
        {$addToSet: {assignments: savedAssignment}}
    )    
    //for each card in the lesson, for every student make a flashcardGrade document and add it to the assignment

    async function insertFlashcardGrades () {
        const allStudents =  targetClass.students;
        //store array of promises
        const promises = req.flashcards.map((card, index) => {

            //Promise.all is used to wait for all promises to resolve before proceeding
            //for each card, it returns a promise that resolves -when- ALL of the card grade objects for the card are saved
            //This happens when all students have had this card created for them
            return Promise.all(
            allStudents.map(async(student) => {
                let newGrade = new CardGrade({
                    assignment: savedAssignment._id,
                    timesPracticed: 0,
                    average: 0,
                    student: student,
                    card: index +1,
                    class: targetClass._id
                })
    
               const savedCardGrade = await newGrade.save()
               //We have to do an asynchronous operation in the for loop
                
               //this return value resolves the promise created by the inner map function
               return savedCardGrade;

            })
           
        )})
        //promises is an array of promises so we wait for all of the cards for all of the students to resolve before returning
        await Promise.all(promises)
    }

    insertFlashcardGrades()



    /*
    Need to create AssignmentGrade cards that represent the progress of the assignment -as a whole-
    Single iteration through the students to make a card for each of them and then store the reference in the assignment at hand 
    for easy access for the teacher and for possible importing to a grade book 
    */
  
});

/*
Use cases for GET:

1) The student wants to get their assignment info (filter by this student only)
2) The teacher/admin wants to get their assignment info (no filtering by individual student, just get all the info)

Use separate routes for each case
*/


/*
Use cases for PUT:

Updating an assignment would not change the flashcards being used, it would change the parameters for the assignment

As a reminder: 
    minAttempts: {type: Number},
    goalAverage: {type: Number},
    scoringType: {type:String},
    lessonName: {type: String}

The atomic score not be updated
The card grades WOULD possibly also have to undergo a re-calculation of the average depending if the scoring type had changed

In turn the assignmentScores would have to be changed as the completion of a card

This is a more complicated venture and is worth a whole ticket by itself 
*/


/*
Use cases for DELETE:

We would delete the assignment itself and...

Find by assignmentID and delete all related:

cardGrades 
assignmentGrades
attemptGrades

*/


module.exports = router; 
