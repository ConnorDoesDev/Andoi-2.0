const Event = require("../../struct/Event");
const { connection } = require("mongoose");

module.exports = class DBError extends Event {
  constructor(...args) {
    super(...args, {
      name: "disconnected",
      emitter: connection,
    });
  }

  run() {
    this.client.log.error("database", "disconnected from the database");
  }
};
