const { model, Schema } = require("mongoose");

module.exports = model(
  "log",
  new Schema(
    {
      guildID: String,
      changes: { type: Array, default: [] },
      leaves: { type: Array, default: [0, 0, 0, 0, 0, 0, 0] },
      joins: { type: Array, default: [0, 0, 0, 0, 0, 0, 0] },
    },
    {
      timestamps: true,
    }
  )
);
