const { Schema, model } = require("mongoose");

module.exports = model(
  "message",
  new Schema(
    {
      messageID: {
        type: String,
        unique: true,
      },
      text: { type: String, required: true },
      userID: String,
      username: String,
      guildID: String,
      channelID: String,
    },
    {
      timestamps: true,
    }
  )
);
