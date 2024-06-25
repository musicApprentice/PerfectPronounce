const express = require('express');
const User = require('../models/User');
const router = express.Router(); 

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("users unsuccessfully sent")

    }
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
        console.log("created new user")
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new user")
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
