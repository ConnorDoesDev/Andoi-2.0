const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "delete",
      desc: "delete the trash!",
      category: "image",
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
    const member = await this.findMember(message, args, true);

    const file = await this.client.images.delete(
      member.user.displayAvatarURL({ format: "png" })
    );

    message.channel.send({ files: [file] });
  }
};
