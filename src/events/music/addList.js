const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Message } = require("discord.js");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Playlist, Queue } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "addList",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Queue} message
   * @param {Playlist} list
   */
  async run(message, list) {
    const lang = await this.lang.getFile(message.guild);
    message.channel.send({ content: lang.MUSIC.ADD_LIST(list) });
  }
};
