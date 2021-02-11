const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlopeSchema = new Schema({
  title: String,
  Price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Slope", SlopeSchema);
