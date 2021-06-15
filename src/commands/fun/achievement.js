const Command = require("../../struct/Command");
const { MessageEmbed, Message } = require(`discord.js`);

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
    const embed = new MessageEmbed()
      .setTitle(await this.client.lang.get(message.guild, "FUN/MC_ACHIEVEMENT"))
      .setImage(
        `https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${text}`
      );
    message.channel.send(embed);
  }
};
