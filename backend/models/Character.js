const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: String,
  height: String,
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  gender: String,
});

module.exports = mongoose.model("Character", characterSchema);
