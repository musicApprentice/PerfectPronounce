const express = require('express');
const assignment = require('../models/assignmentSchema');
const router = express.Router(); 

router.get('/', async (req, res) => {
    try {
        const assignments = await assignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("classes have no contents")

    }
});

router.post('/', async (req, res) => {
    const newAssign = new assignment({
        name: req.body.name,
        card: req.body.card,
        text: req.body.text,
        translation : req.body.translation,
        audio : req.body.audio,
    });
    try {
        const newAssignment = await newAssign.save();
        res.status(201).json(newAssignment);
        console.log("created new user")
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new user")
    }
});

router.delete('delete based on name and card', async (req, res) => {
    try {
        const nameNo = req.params.name;
        const cardNo = req.params.card;
        const delAssign = await assignment.findOne({$and:[{name: nameNo}, {card: cardNo}]});
        if (delAssign === null) {
            return res.status(404).json({ message: "Class not found" });
        }
        await assignment.deleteOne(delAssign);
        res.json({ message: "Deleted Class" });
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

module.exports = router; 

