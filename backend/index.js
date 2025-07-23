require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const express = require("express");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000", 
  "https://fixmyarea-frontend.onrender.com"

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

const app = express();

app.use(express.json({ limit:'10mb' }));
app.use(express.urlencoded({ extended:true, limit:'10mb' }));

const IssueRoutes = require("./routes/IssueRoutes");

console.log("✅ IssueRoutes loaded");


app.get("/", (req, res) => {
  res.send("FixMyArea backend is live, check it out");
});

app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/issues', IssueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


