const Command = require("../../struct/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "quote",
      desc: "Quote text",
      usage: "[text]",
      example: ["quote me please"],
      category: "fun",
      guildOnly: false,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["text"],
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    message.send(`> ${args.join(" ")}\n ${message.author}`);
  }
};
