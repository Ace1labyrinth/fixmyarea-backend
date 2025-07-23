const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    category: { type: String, default: "Pothole" },
    description: { type: String, required: true},
    location: { type: String },
    lga: {type: String },
    image: { type: String }, //URL
    geo: {
        lat: Number,
        lng: Number,
    },
    status: {
        type: String,
        default: "active",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Issue", IssueSchema);