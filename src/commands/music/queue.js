const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "queue",
      desc: "Get the queue",
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
    const queue = this.client.player.getQueue(message);
    const embed = new AndoiEmbed(message.author)
      .setTitle(lang.MUSIC.QUEUE(message.guild))
      .setDescription(lang.MUSIC.QUEUE_DESC(queue.songs))
      .addField(lang.MUSIC.CURRENT_PLAY, queue.songs[0].name);

    message.channel.send({ embeds: [embed] });
  }
};
