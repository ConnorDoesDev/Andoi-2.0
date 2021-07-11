const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Message } = require("discord.js");
const { SearchResult } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "searchInvalidAnswer",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Message} message
   */
  async run(message) {
    const lang = await this.lang.getFile(message.guild);
    message.channel.send({ content: lang.MUSIC.INVALID });
  }
};
