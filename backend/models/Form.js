const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  activity: String,
  from: String,
  to: String,
  side: String,
  length: Number,
  width: Number,
  depth: Number,
  qty: Number,
  unit: String,
  lead: Number,
  trips: Number,
  remark: String
});

module.exports = mongoose.model("Form", formSchema);
