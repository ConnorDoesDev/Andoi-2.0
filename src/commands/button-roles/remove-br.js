const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");

const btnroles = require("../../struct/buttonRoles");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "remove-br",
      desc: "remove's an role from the button roles",
      usage: "[messageID] [roleID]",
      example: ["859780326578323457 746444711627194461"],
      category: "button-roles",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["ADMINISTRATOR"],
      botPerms: [],
      nsfw: false,
      args: ["message id", "role id"],
      voice: false,
      sameVoice: false,
      aliases: ["removebr", "remb"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    return btnroles.remove({
      client: this.client,
      messageID: args[0],
      roleID: args[1],
    });
  }
};
