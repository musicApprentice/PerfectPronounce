const express = require('express');
const Class = require('../models/classSchema');
const router = express.Router(); 

router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("classes have no contents")

    }
});

router.post('/', async (req, res) => {
    const newClass = new Class({
        name: req.body.name,
        language: req.body.language,
        id: req.body.id,
        assignments : req.body.assignments,
        metrics : req.body.metrics,
        students : req.body.students,
        teachers : req.body.teachers,
    });
    try {
        const classSaved = await newClass.save();
        res.status(201).json(classSaved);
        console.log("created new Class")
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new Class")
    }
});

router.delete('/id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const delClass = await Class.findOne({ id: id });
        if (delClass === null) {
            return res.status(404).json({ message: "Class not found" });
        }
        await Class.deleteOne({ id: id });
        res.json({ message: "Deleted Class" });
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

module.exports = router; 
