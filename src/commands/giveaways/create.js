const Command = require("../../struct/Command");
const { Message } = require("discord.js");
module.exports = class CreateGiveawayCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "create",
      desc: "Create/start a giveaway",
      usage: "[]",
      example: [],
      category: "giveaways",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["MANAGE_CHANNELS"],
      botPerms: ["MANAGE_CHANNELS"],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
      aliases: ["start"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const helper = require("../../helpers/giveaway");
    await helper.start(this.client, message, args);
  }
};
