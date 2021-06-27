const Command = require("../../struct/Command");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "calculator",
      desc: "Calculate big brain stuff",
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
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const helper = require("../../helpers/calculator");
    await helper(message);
  }
};
