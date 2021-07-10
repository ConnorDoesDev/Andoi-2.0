const { model, Schema } = require("mongoose");

module.exports = model(
  "User",
  new Schema({
    user: String,
    badges: Array
  })
);
