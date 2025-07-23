const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  lga: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
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