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
    welcomeMessage: {
      enabled: { type: Boolean, default: false },
      message: {
        type: String,
        default:
          "Welcome {user.username} to {server.name} hope you have a good day staying!",
      },
      channelID: { type: String, default: null },
    },
    leaveMessage: {
      enabled: { type: Boolean, default: false },
      message: {
        type: String,
        default: "Bye {user.username} we will miss you",
      },
      channelID: { type: String, default: null },
    },
  })
);
