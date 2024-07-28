const User = require('../models/userSchema');
const bcrypt = require('bcrypt')

async function findUsers(req,res){
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("users unsuccessfully sent")
        //test
    
    }
} 
async function createNewUser(req,res){
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        school: req.body.selectedSchool,
        password: await hashPassWord(req.body.password),
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

}
async function deleteUser(req,res){
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
}
async function hashPassWord(plainPass){
    const salt = await bcrypt.genSalt()
    const modifiedPass = await bcrypt.hash(plainPass,salt)
    return modifiedPass
}
async function verifyLogin(req,res){
    const email = req.body.email
    const password = req.body.password
    let confirm = false
    await User.exists({"email":email}).exec().then(async e =>{
         if(e){
             const user = (await User.find({"_id":e}))[0]
             confirm = await bcrypt.compare(password,user.password) ? true:false 
         }
     })
     return confirm
        
}

module.exports = {findUsers,createNewUser,deleteUser, verifyLogin}
