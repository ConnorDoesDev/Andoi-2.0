const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "play",
      desc: "Play a song",
      usage: "[song]",
      example: ["less go"],
      category: "music",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["song"],
      voice: true,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const song = args.join(" ");
    try {
      this.client.player.play(message, song);
    } catch (err) {
      console.log(err);
      message.channel.send({
        content: await this.lang.get(message.guild, "ERROR"),
      });
    }
  }
};
