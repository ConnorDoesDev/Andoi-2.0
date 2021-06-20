const Command = require("../../struct/Command");
const { Message } = require(`discord.js`);
const chroma = require("chroma-js");

const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "color",
      desc: "Color info",
      usage: "[color]",
      example: ["red"],
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["color"],
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
    const color = chroma(args[0]);
    const preview = `https://api.no-api-key.com/api/v2/color?hex=${
      color.hex().split("#")[1]
    }`;

    const embed = new AndoiEmbed(mssage.author)
      .setThumbnail(preview)
      .setTimestamp()
      .addField("Hex", color.hex())
      .addField("Rgb", `rgb(${color.rgb().join(", ")})`)
      .addField("Rgba", `rgba(${color.rgba().join(", ")})`)
      .setColor(color.num());

    message.channel.send(embed);
  }
};
