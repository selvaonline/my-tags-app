const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 8080;
const dataFilePath = "tags.json";

app.use(cors());
app.use(bodyParser.json());

// Unified endpoint to handle both get and post for tags
app
  .route("/api/tags")
  .get((req, res) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading tags data.");
        return;
      }
      res.json(JSON.parse(data));
    });
  })
  .post((req, res) => {
    const { tags, options } = req.body; // Receive tags and maybe options to update
    const newData = JSON.stringify({ tags, options }, null, 2);
    fs.writeFile(dataFilePath, newData, "utf8", (err) => {
      if (err) {
        res.status(500).send("Error updating tags data.");
        return;
      }
      res.send("Tags updated successfully.");
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
