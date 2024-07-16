const express = require('express');
const Class = require('../models/classSchema');
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
        try {
            const classSaved = await newClass.save();
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
