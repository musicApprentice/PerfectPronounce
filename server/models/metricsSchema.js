const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    card: {type: Number, required: true},
    text:{type: String, required: true},
    translation:{type: String, require: true},
    audio:{type: String, require: true},
    user: {type: mongoose.Schema.ObjectId, ref: "User" }
})

const Metrics = mongoose.model("assignment", metricsSchema);
module.exports = Metrics;
