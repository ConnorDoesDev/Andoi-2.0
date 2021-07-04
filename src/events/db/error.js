const Event = require("../../struct/Event");
const { connection } = require("mongoose");

module.exports = class DBError extends Event {
  constructor(...args) {
    super(...args, {
      name: "error",
      emitter: connection,
    });
  }

  run(error) {
    this.client.log.error("database", error);
  }
};
