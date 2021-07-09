const { model, Schema } = require("mongoose");

module.exports = model(
  "user",
  new Schema({
    user: String,
    badges: Array
  })
);
