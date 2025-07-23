const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
// const IssuesRoutes = require('./routes/IssuesRoutes');

// Post new Issues
router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Issue not Saved" });
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
