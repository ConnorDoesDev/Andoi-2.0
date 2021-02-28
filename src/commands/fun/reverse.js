const Command = require("../../struct/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "reverse",
      desc: "reverse text",
      usage: "[text]",
      example: ["owo"],
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
    message.channel.send(args.join(" ").split("").reverse().join(" "));
  }
};
