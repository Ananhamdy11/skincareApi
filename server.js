import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json()); 

const dataPath = new URL("./api.json", import.meta.url);
let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

//  GET request
app.get("/api/data", (req, res) => {
  res.json(data);
});

//  POST request
app.post("/api/data", (req, res) => {
  const newItem = req.body;

  if (!newItem) {
    return res.status(400).json({ message: "No data provided" });
  }

  data.push(newItem);

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

  res.status(201).json({ message: "Data added successfully!", newItem });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
