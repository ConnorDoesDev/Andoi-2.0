const Command = require("../../struct/Command");
const { Message } = require(`discord.js`);
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "achievement",
      desc: "Minecraft :D",
      category: "fun",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["text"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   *
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const text = args.join("+");
    const embed = new AndoiEmbed()
      .setTitle(await this.client.lang.get(message.guild, "FUN/MC_ACHIEVEMENT"))
      .setImage(
        `https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${text}`
      );
    message.channel.send({ embeds: [embed] });
  }
};
