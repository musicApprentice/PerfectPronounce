const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

const userRoutes = require('./routes/users');
const classRoutes = require('./routes/classes');

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

app.listen(port, () => {
    console.log("server running at http://localhost:${port}")
});


