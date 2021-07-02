const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const fetch = require("node-fetch");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "joke",
      desc: "Laugh",
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
    const data = await fetch("https://api.tovade.xyz/v1/fun/joke").then((res) =>
      res.json()
    );
    const embed = new AndoiEmbed(message.member.user).setDescription(
      `${data.question} ||${data.answer}||`
    );
    message.channel.send({ embeds: [embed] });
  }
};
