const { model, Schema } = require("mongoose");

module.exports = model(
  "premium",
  new Schema({
    code: String,
    expires: { type: String, default: Date.now() + 2592000000 },
    plan: String,
  })
);
