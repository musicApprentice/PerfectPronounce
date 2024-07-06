const express = require('express');
const User = require('../models/userSchema');
const router = express.Router(); 

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("users unsuccessfully sent")
        //test

    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        school: req.body.selectedSchool,
        role: req.body.role
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
        console.log("created new user")
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error creating new user")
    }
});

router.delete('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.deleteOne({ email: email });
        res.json({ message: "Deleted User" });
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

module.exports = router; 
