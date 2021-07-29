const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "magik",
      desc: "Curse your profile picture",
      usage: "[member]",
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
    const lang = await this.lang.getFile(message.guild);
    const member = await this.findMember(message, args, true);
    let intensity = args[1];
    if (member.user.id === message.author.id) {
      intensity = args[0];
    }
    let file;
    if (!intensity)
      file = await this.client.images.magik(
        member.user.displayAvatarURL({ format: "png" })
      );
    if (!file && !parseInt(intensity))
      return message.channel.send({ content: lang.IMAGE.INVALID_NUMBER });
    if (intensity)
      file = await this.client.images.magik(
        member.user.displayAvatarURL({ format: "png" }),
        intensity
      );

    message.channel.send({ files: [file] });
  }
};
