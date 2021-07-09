const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Message } = require("discord.js");
const { Queue, Song } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "error",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  async run(channel, error) {
    console.log(error);
    const lang = await this.lang.getFile(channel.guild);
    channel.send({ content: lang.ERROR });
  }
};
