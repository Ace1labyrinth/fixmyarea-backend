const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
// const IssuesRoutes = require('./routes/IssuesRoutes');

// Post new Issues
router.post("/", async (req, res) => {
  try {
    const { category, description, location, lga, image, geo } = req.body;

    console.log("🔥 Received issue body:", req.body);

    // Basic validation
    if (!category || !description || !location || !lga) {
      return res.status(400).json({ message: "Missing required field." });
    }

    const newIssue = new Issue({
      category,
      description,
      location,
      lga,
      image: image || null,
      geo: geo || null,
    });

    await newIssue.save();

    res.status(201).json({ message: "Issue submitted successfully." });
  } catch (err) {
    console.error("❌ Backend error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all Issues

router.get("/test", (req, res) => {
  res.send("✅ IssueRoutes are connected!");
});

router.get("/", async (req, res) => {
  console.log("GET /api/issues called");
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: "Failedto fetch Issues" });
  }
});

//To delete issue

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/issues/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update issue' });
  }
});


module.exports = router;
