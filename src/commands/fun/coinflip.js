const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "coinflip",
      desc: "Flip da coin",
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
    const num = Math.floor(Math.random() * 2);
    let result;
    if (num === 1) result = "heads";
    else result = "tails";
    const embed = new AndoiEmbed(message.author)
      .setColor("GREEN")
      .setDescription(
        await message.t("FUN/COINFLIP", { result, user: message.author })
      );
    message.channel.send({ embeds: [embed] });
  }
};
