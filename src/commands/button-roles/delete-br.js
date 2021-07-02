const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "delete-br",
      desc: "Delete button roles.",
      usage: "[message id]",
      category: "button-roles",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["ADMINISTRATOR"],
      botPerms: [],
      nsfw: false,
      args: ["message id"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const btn = require("../../struct/buttonRoles");
    await btn.delete({ client: this.client, messageID: args[0] });
    message.channel.send({
      content: await message.t("BUTTON_ROLES/DELETE_GOOD"),
    });
  }
};
