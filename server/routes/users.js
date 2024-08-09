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

router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({email:req.params.email});
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.json(user._id);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("Error finding user")

    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        school: req.body.school,
        role: req.body.role,
        password: req.body.password
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
        console.log("deleted user", email)
        res.json({ message: "Deleted User" });
    } catch (err) {
        console.log("error deleting user")

        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

module.exports = router; 
