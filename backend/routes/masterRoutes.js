const express = require("express");
const router = express.Router();
const Master = require("../models/Master");

// Add option
router.post("/add", async (req, res) => {
  const data = new Master(req.body);
  await data.save();
  res.send("Added");
});

// Get options
router.get("/:type", async (req, res) => {
  const data = await Master.find({ type: req.params.type });
  res.json(data);
});

module.exports = router;
