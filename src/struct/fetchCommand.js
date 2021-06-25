const Command = require("./Command");
const fetch = require("node-fetch");
const { Message } = require("discord.js");
module.exports = class FetchCommand extends Command {
  constructor(client, name, options = {}) {
    super(client, name, options);
  }
  /**
   *
   * @param {Message} message
   * @param {string} url
   */
  async start(message, url = this.url) {
    message.channel.startTyping();
    const data = await fetch(url).then((res) => res.json());

    await this.handleResult(data, message);
    message.channel.stopTyping();
  }
};
