const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "end",
      desc: "end a giveaway",
      usage: "[message_id]",
      category: "giveaways",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["MANAGE_CHANNELS"],
      botPerms: ["MANAGE_CHANNELS"],
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
    const helper = require("../../helpers/giveaway");
    await helper.end(this.client, message, args);
  }
};
