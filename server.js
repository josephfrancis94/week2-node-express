require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// ROUTES

// GET /static
app.get("/static", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//GET /
app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Missing fields: name and email are required" });
  }
  // Simulate DB save
  res.status(201).json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page not found :(");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Dynamic port from .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
