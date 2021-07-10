const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Queue } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "initQueue",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Queue} queue
   */
  async run(queue) {
    queue.autoplay = false;
    queue.volume = 100;
  }
};
