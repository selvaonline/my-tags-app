const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;
const dataFilePath = path.join(__dirname, "tags.json"); // Path to your JSON file

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch all tags
app.get("/api/tags", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read tags file:", err);
      res.status(500).send("Error reading tags data.");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to update all tags
app.post("/api/tags/update", (req, res) => {
  const tags = req.body; // Receive the complete state of tags from the frontend
  fs.writeFile(dataFilePath, JSON.stringify(tags, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Failed to write tags file:", err);
      res.status(500).send("Error updating tags data.");
      return;
    }
    res.send("Tags updated successfully.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
