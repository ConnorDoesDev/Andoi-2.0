const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "stop",
      desc: "Stop the music!",
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
    this.client.player.setRepeatMode(message, 0);
    this.client.player.stop(message);
    const lang = await this.lang.getFile(message.guild);
    message.channel.send({ content: lang.MUSIC.STOP });
  }
};
