const { Schema, model } = require("mongoose");
module.exports = model(
  "Config",
  new Schema({
    guild: String,
    prefix: { type: String, default: "a." },
    language: { type: String, default: "english" },
  })
);
