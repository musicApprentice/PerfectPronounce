const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

const userRoutes = require('./routes/users');
const classRoutes = require('./routes/classes');
const lessonRoutes = require('./routes/lessons');
const assignmentRoute = require('./routes/assignments');
const cardGradesRoute = require("./routes/cardGrades");

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); //Middleware to parse JSON bodies

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

app.use('/api/users', userRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/assignments', assignmentRoute)
app.use('/api/cardGrades', cardGradesRoute)

app.listen(port, () => {
    console.log("server running at http://localhost:${port}")
});


