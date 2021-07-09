const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Message } = require("discord.js");
const { Queue, Song } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "empty",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Queue} queue
   * @param {Song} song
   */
  async run(queue) {
    const lang = await this.lang.getFile(queue.textChannel.guild);
    queue.textChannel.send({ content: lang.MUSIC.EMPTY_VC });
  }
};
