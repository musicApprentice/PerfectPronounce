const express = require('express');
const Lesson = require('../models/lessonSchema.js');
const FlashCard = require('../models/flashcard.js');
const Class = require('../models/classSchema.js');
const User = require('../models/userSchema.js')
const router = express.Router(); 

/**
 * @name insertFlashcards
 * @param {string} flashcards 
 * @returns object ID's of all the flashcards in the array
 * @description Inserts flashcards into database and returns all the references of  the flashcards
 */
async function insertFlashcards(flashcardData) {
    const flashcards = await FlashCard.insertMany(flashcardData);
    return flashcards.map((card)=> card._id);
}

router.route('/')
    .post(async (req, res) => {
        console.log(req.body);
        const flashcards = await insertFlashcards(req.body.flashcards)
        
       

        const lesson = new Lesson({
            name: req.body.lessonName,
            flashcards: flashcards,
            class: req.body.course
        })
        const savedLesson = await lesson.save()

        await Class.updateOne(
            {_id: {$in: req.body.course}},
            {$addToSet: {lessons: savedLesson._id}}
        )
        const targetClass = await Class.findById(req.body.course)
        
        if (!targetClass) {
            return res.status(400).send({error: "class not found"})
        }
        

        //TODO:courseList should be replaced with targetLesson
        await User.updateMany(
            {_id: {$in: targetClass.students}}, //find where the _id matches any of the documents in students
            {$addToSet: {courseList: targetClass._id}} //adds to the set (no duplicates) and updates the courseList field
        )

        await User.updateMany(
            {_id: {$in: targetClass.teachers}}, //find where the _id matches any of the documents in students
            {$addToSet: {courseList: targetClass._id}} //adds to the set (no duplicates) and updates the courseList field
        )

        res.status(201);
        console.log("successful creation of lesson")

    })
    .get(async (req, res) => {
        try {
            const lessonDoc = await Lesson.find().populate("flashcards")

            if (!lessonDoc) {
                return res.status(404).json({message: "Lesson not found"})
            }
            res.json(lessonDoc)
        }
        catch (err) {
            res.status(400).json({message: err.message});
            console.log("Error retrieving lessons")
        }
    })
    router.route('/id/:id')
    .delete(async (req, res) => {
        //TODO:Delete from user lists too
        //TODO:Delete the associated assignments too 
        
        try {
            const id = req.params.id;
            console.log(id)
            
            const delClass = await Lesson.findOne({_id: id})
            if (!delClass) {
                return res.status(404).json({message: "Lesson not found"})
            }
            await Lesson.deleteOne({_id:id})
            console.log(req.params.id, "deleted")

        }
        catch (err) {
            res.status(500).json({message: err.message});
            console.log("Internal server error")
        }
    })
    

module.exports = router; 
