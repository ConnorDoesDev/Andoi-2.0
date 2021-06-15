const Command = require("../../struct/Command");
const { Message } = require("discord.js");
const fetch = require("node-fetch");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "advice",
      desc: "Get advice",
      category: "fun",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
    });
  }
  /**
   *
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const data = await fetch("https://api.adviceslip.com/advice").then((res) =>
      res.json()
    );
    return message.channel.send(data.slip.advice);
  }
};
