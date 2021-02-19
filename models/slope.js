const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlopeSchema = new Schema({
  title: String,
  image: String,
  difficulty: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("Slope", SlopeSchema);
