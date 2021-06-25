const Command = require("../../struct/fetchCommand");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class CaptchaCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "captcha",
      desc: "Captcha.",
      usage: "[member]",
      example: [],
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
    const user = this.findMember(message, args, true).user;

    await this.start(
      message,
      encodeURI(
        `https://nekobot.xyz/api/imagegen?type=captcha&username=${
          user.username
        }&url=${user.displayAvatarURL({ format: "png", size: 512 })}`
      )
    );
  }
  async handleResult(data, message) {
    const embed = new AndoiEmbed(message.author)
      .setSuccess()
      .setTitle(await this.lang.get(message.guild, "FUN/SOLVE_CAPTCHA"))
      .setImage(data.message);

    message.channel.send(embed);
  }
};
