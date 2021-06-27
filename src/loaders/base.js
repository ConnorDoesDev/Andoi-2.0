const Utils = require("../utils/index");

module.exports = class Loader {
  /**
   * @param {Object} opts
   * @param {boolean} [opts.critical]
   * @param {Client} client
   */
  constructor(opts, client) {
    const options = Utils.createOptionHandler("Loader", opts);

    this.critical = options.optional("critical", false);
    this.preLoad = options.optional("preLoad", false);

    this.client = client;
  }

  load(client) {
    return true;
  }

  log(str, next) {
    return this.client.log.info(str, next);
  }

  logError(str) {
    return this.client.log.error(str, next);
  }
};
