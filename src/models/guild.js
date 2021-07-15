const { Schema, model } = require("mongoose");
module.exports = model(
  "Config",
  new Schema({
    guild: String,
    prefix: { type: String, default: "a!" },
    language: { type: String, default: "english" },
    premium: {
      enabled: { type: Boolean, default: false },
      redeemedAt: String,
      redeemedBy: String,
      expiresAt: String,
      plan: String,
    },
    chatbot: { type: String, default: null },
  })
);
