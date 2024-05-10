const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const dataPath = path.join(__dirname, "tags.json");

app.use(cors());
app.use(bodyParser.json());

// API to get tags
app.get("/api/tags", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ message: "Error reading file" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// API to add a tag
app.post("/api/tags", (req, res) => {
  const newTag = req.body;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ message: "Error reading file" });
      return;
    }
    const tags = JSON.parse(data);
    tags.push(newTag);
    fs.writeFile(dataPath, JSON.stringify(tags), "utf8", (err) => {
      if (err) {
        res.status(400).json({ message: "Error writing file" });
        return;
      }
      res.json(newTag);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
