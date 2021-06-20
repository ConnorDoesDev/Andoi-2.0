const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const fetch = require("node-fetch");
const { Message } = require("discord.js");
module.exports = class shorturl extends Command {
  constructor(...args) {
    super(...args, {
      name: "shorturl",
      desc: "Make an super long url very short",
      usage: "[url]",
      example: ["https://discord.com"],
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["url"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const url = args.join(" ");

    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    const embed = new AndoiEmbed(message.author)
      .setTitle("shorturl")
      .setDescription(`**Old url:** ${url}\n **New url:** ${data.shorturl}`);
    message.channel.send(embed);
  }
};
