const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

router.post("/submit", async (req, res) => {
  await Form.insertMany(req.body);
  res.send("Saved");
});

router.get("/all", async (req, res) => {
  const data = await Form.find();
  res.json(data);
});

module.exports = router;
