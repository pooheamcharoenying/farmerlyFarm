const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FarmSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  farmSlug: {
    type: String,
  },
  farmName: {
    type: String,
  },
  farmLocation: {
    type: String
  },
  farmProductList: {
    type: String
  },
  farmImageURI: {
    type: String
  },
});

module.exports = FarmSchema