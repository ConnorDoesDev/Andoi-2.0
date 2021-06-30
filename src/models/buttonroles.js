const { model, Schema, SchemaTypes } = require("mongoose");

module.exports = model(
  "buttonRole",
  new Schema({
    messageID: String,
    roles: Array,
    content: SchemaTypes.Mixed,
    channelID: String,
  })
);
