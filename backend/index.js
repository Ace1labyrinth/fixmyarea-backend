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
  "https://timely-babka-c7d84e.netlify.app"
]

const app = express();
app.use(cors({ origin: "*"
  // origin: function (origin, callback) {
  //   // Allow requests with no origin (like mobile apps or curl)
  //   if (!origin) return callback(null, true);
  //   if (allowedOrigins.includes(origin)) {
  //     return callback(null, true);
  //   } else {
  //     return callback(new Error("Not allowed by CORS"));
  //   }
  // },
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true
}));
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


