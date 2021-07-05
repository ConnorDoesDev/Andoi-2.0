const Command = require("../../struct/Command");
const figlet = require("figlet");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "ascii",
      desc: "Make cool text",
      usage: "[text]",
      example: ["tovade"],
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
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const text = args.join(" ");
    figlet.text(text, (e, txt) => {
      message.channel.send({ content: `\`\`\`${txt.trimRight()}\`\`\`` });
    });
  }
};
