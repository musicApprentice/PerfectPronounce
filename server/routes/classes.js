const express = require('express');
const Class = require('../models/classSchema');
const User = require('../models/userSchema')
const router = express.Router(); 

router.route('/')
  .get(async (req, res) => {
    try {
  
      const classDoc = await Class.find()
      //populate replaces the objectId's are in the students and teachers array of class with the actual objects
        .populate('students')
        .populate('teachers');
  
      if (!classDoc) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.json(classDoc);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log("Error retrieving class", err);
    }
  })
  

    .post(async (req, res) => {
        console.log(req.body)
        const newClass = new Class({
            courseNumber: req.body.courseNumber,
            className: req.body.className,
            school: req.body.school,
            language: req.body.language,
            students : req.body.students,
            teachers : req.body.teachers
            //students and teachers are an array of objectIds that reference actually users

        });
        //For each student in the class and teacher in the class, I want to add this class ID to their classList
        try {
            const classSaved = await newClass.save();
            const classId = classSaved._id;

            await User.updateMany(
              {_id: {$in: req.body.students}}, //find where the _id matches any of the documents in students
              {$addToSet: {courseList: classId}} //adds to the set (no duplicates) and updates the courseList field
            )

            await User.updateMany(
              {_id: {$in: req.body.teachers}},
              {$addToSet: {courseList:classId}}
            )

            res.status(201).json(classSaved);
            console.log("created new Class")
        } catch (err) {
            res.status(400).json({ message: err.message });
            console.log("error creating new Class", err)
        }
    })


router.delete('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const delClass = await Class.findOne({ _id: id });
        console.log(delClass)

        await User.updateMany(
          {_id: {$in: delClass.students}}, //find where the _id matches any of the documents in students
          {$pull: {courseList: id}} //removes and updates the courseList field for each student
        )

        await User.updateMany(
          {_id: {$in: delClass.teachers }},
          {$pull: {courseList:id}}
        )

        if (!delClass) {
            return res.status(404).json({ message: "Class not found" });
        }
        await Class.deleteOne({ _id: id });
        res.json({ message: "Deleted Class" });
        console.log("deleted course")
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

module.exports = router; 
