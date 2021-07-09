const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "resume",
      desc: "Resume the music",
      category: "music",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
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
    if (!this.client.player.getQueue(message).paused)
      return message.channel.send({ content: lang.MUSIC.NOT_PAUSED });
    this.client.player.resume(message);
    message.channel.send({ content: lang.MUSIC.RESUME });
  }
};
