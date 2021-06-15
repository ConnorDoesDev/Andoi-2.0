const Command = require("../../struct/Command");
const { MessageEmbed, Message } = require(`discord.js`);
const chroma = require("chroma-js");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "color",
      desc: "Color info",
      usage: "[color]",
      example: ["red"],
      category: "general",
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

    const embed = new MessageEmbed()
      .setThumbnail(preview)
      .setTimestamp()
      .addField("Hex", color.hex())
      .addField("Rgb", `rgb(${color.rgb().join(", ")})`)
      .addField("Rgba", `rgba(${color.rgba().join(", ")})`)
      .setColor(color.num())
      .setColor(color);

    message.channel.send(embed);
  }
};
