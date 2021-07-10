const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "volume",
      desc: "Set the volume",
      usage: "[amount]",
      example: ["200"],
      category: "music",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["volume"],
      voice: true,
      sameVoice: true,
      playing: true,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    if (parseInt(args[0]) > 400)
      return message.channel.send({ content: lang.MUSIC.TO_LOUD });
    this.client.player.setVolume(message, parseInt(args[0]));
    message.channel.send({ content: lang.MUSIC.SUCCESS_VOLUME(args[0]) });
  }
};
