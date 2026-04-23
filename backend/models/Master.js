const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
  type: String,
  value: String
});

module.exports = mongoose.model("Master", masterSchema);
