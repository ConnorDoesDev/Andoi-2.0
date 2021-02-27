const Event = require("../../struct/Event");
const { connection } = require("mongoose");

module.exports = class DBError extends Event {
  constructor(...args) {
    super(...args, {
      emitter: connection,
    });
  }

  run() {
    this.client.log.info("database", "Reconnected succesfully to database");
  }
};
