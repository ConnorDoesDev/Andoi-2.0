const Command = require("../../struct/Command");
const fetch = require("node-fetch");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "advice",
      desc: "Get advice",
      usage: "[]",
      example: [""],
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

  async run(message, args) {
    const data = await fetch("https://api.adviceslip.com/advice").then((res) =>
      res.json()
    );

    message.channel.send(data.slip.advice);
  }
};
