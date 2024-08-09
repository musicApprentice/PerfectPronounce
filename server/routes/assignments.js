const Assignment = require("../models/assignmentSchema.js")
const CardGrade = require("../models/cardGradeSchema.js");
const Class = require("../models/classSchema.js")
const User = require('../models/userSchema.js')
const AssignmentScoreCard = require('../models/assignmentScoreCardSchema.js')
const express = require('express');
const router = express.Router(); 

async function insertFlashcardGrades(req, allStudents, targetClass, assignment) {
    console.log("In insertFlashcards function");
    
    console.log("TargetClass", targetClass)

    console.log("All students:", allStudents);

    try {
        console.log("Flashcards:", req.body.lesson.flashcards);

        const cardPromises = req.body.lesson.flashcards.map(async (card) => {
            console.log("Processing card:", card);

            const studentPromises = allStudents.map(async (student) => {
                console.log("Processing student:", student);

                let newGrade = new CardGrade({
                    assignment: assignment._id,
                    timesPracticed: 0,
                    average: 0,
                    student: student,
                    card: card._id,
                    class: targetClass._id
                });

                try {
                    const savedCardGrade = await newGrade.save();
                    console.log("Saved GradeCard:", savedCardGrade);

                    await Assignment.updateOne(
                        { _id: assignment._id },
                        { $addToSet: { cardScores: savedCardGrade._id } }
                    );

                    console.log("Grade has been saved for student:", student, "card:", card);
                    return savedCardGrade;
                } catch (e) {
                    console.error("Error saving grade card for student:", student, "card:", card, "error:", e);
                    throw e; // Rethrow the error to be caught by the outer catch
                }
            });

            return Promise.all(studentPromises); // Wait for all student promises to resolve
        });

        await Promise.all(cardPromises); // Wait for all card promises to resolve
        console.log("All grades have been saved");
    } catch (e) {
        console.error("Error in insertFlashcardGrades:", e);
    }
}

// Add assignment to class

  //TODO: Turn insert flashcard grades and insert assignment grades into function calls so this doesn't look so crazy
router.post('/', async (req, res) => {
    //Also want the req to have the flashcards so I don't need extra computation, call it flashcards
    console.log(req.body)
    console.log(req.body.lesson.class, "class id")
    let newAssignment = new Assignment({
        lesson: req.body.lesson._id,
        minAttempts: req.body.attempts,
        goalAverage: req.body.goalAverage,
        scoringType: req.body.scoringType,
        lessonName: req.body.lesson.name,
        class: req.body.lesson.class
    })
    const savedAssignment = await newAssignment.save()
    console.log(savedAssignment.class)
    await Class.updateOne(
        {_id:{$in: savedAssignment.class}}, //match the class in the Class collection
        {$addToSet: {assignments: savedAssignment._id}} //insert the savedAssignment into the assignment field
    )

    const targetClass = await Class.findById(savedAssignment.class)
    if (!targetClass) {
        console.log("No class found")
        return;
    }
    //Add the assignment to every student's list
    await User.updateMany(
        {_id: {$in: targetClass.students}},
        {$addToSet: {assignments: savedAssignment}}
    )    
  
    
    await targetClass.populate("students");
    const allStudents = targetClass.students;
    insertFlashcardGrades(req, allStudents, targetClass, savedAssignment);
    res.status(200).json()

    /*

    Need to create AssignmentGrade cards that represent the progress of the assignment -as a whole-
    Single iteration through the students to make a card for each of them and then store the reference in the assignment at hand 
    for easy access for the teacher and for possible importing to a grade book 
    */
   function insertAssignmentGradeCards (students, assignment, flashcardCount) {
        console.log(students)
        console.log(assignment)
        //when using map with an asynchronous function, map will return an array of promises
        //therefore to properly handle this, we have to use Promise.all to wait for all promises to resolve
        const promises = students.map(async (student) => {
            const newAssignmentCard = new AssignmentScoreCard({
                totalCards: flashcardCount,
                cardsLeft: flashcardCount,
                student: student,
                assignment: assignment._id
            })
            const savedCard = await newAssignmentCard.save();
            await Assignment.updateOne(
                { _id: assignment._id },
                { $addToSet: { assignmentScores: savedCard._id } }
            );
        })

        return Promise.all(promises);
   }
   insertAssignmentGradeCards(allStudents, savedAssignment, req.body.lesson.flashcards.length)
  
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
