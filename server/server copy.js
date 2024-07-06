const express = require("express");
const mongoose = require('mongoose');
const User = require('./models/User')
const cors = require('cors'); // Import the cors middleware


const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); //Middleware to parse JSON bodies

const CONNECTIONSTRING = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
mongoose.connect(CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

//get request: used to get from the database in the backend
//app calls get with specified route (which the frontend will use)
//and then a callback where we then do the appropriate processing
app.get('/api/users', async (req, res) => {
    try {
        //Queries "User" collection in database
        //find called with no parameters fetches all of the documents
        const users = await User.find();
        res.json(users); //res object calls json with users which sends json of users to the frontend
    } catch (err) {
        res.status(500).json({message: err.message})
        //res.status(500) returns res so you can method chain
        //res object calls status with 500 which sends status to frontend
    }
});

// const users = await User.find({ age: { $gt: 18 } }, 'name email')
//                         .sort({ name: 1 })
//                         .limit(10)
//                         .skip(5);


//post request: used to add to the database
app.post("/api/users", async (req, res) => {
    //req will come in from the frontend
    //create a new User object as specified by our User model
    //req.body: An object containing the body of the request which has the information sent by the client

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        school: req.body.school,
        state: req.body.state
    });
    try {
        const newUser = await user.save();
        //saves user to the database
        res.status(201).json(newUser);
        console.log("User saved")
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

app.delete('/api/users/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        console.log(`Attempting to delete user with email: ${email}`);
        
        const user = await User.findOne({ email: email });
        if (user === null) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }
        
        await User.deleteOne({ email: email });
        console.log('User deleted successfully');
        res.json({ message: "Deleted User" });
    } catch (err) {
        console.error(`Error deleting user with email ${req.params.email}:`, err);
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
});

// //The req object represents the HTTP request and contains information about the request, such as:
// req.params: An object containing route parameters (e.g., /users/:id would populate req.params.id).
// req.query: An object containing query parameters (e.g., /users?name=John would populate req.query.name).
// req.headers: An object containing request headers.

// The res object represents the HTTP response that the Express app sends when it receives an HTTP request. It contains methods to send the response back to the client, such as:
// res.send(): Sends a response of various types.
// res.json(): Sends a JSON response.
// res.status(): Sets the HTTP status code of the response.
// res.redirect(): Redirects the client to a different URL.


app.listen(port, () => {
    console.log("server running at http://localhost:${port}")
});


