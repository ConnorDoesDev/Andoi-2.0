const Command = require("../../struct/Command");
const Random = require("srod-v2");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "joke",
      desc: "Get a joke!",
      usage: "[]",
      example: [""],
      category: "fun",
      guildOnly: false,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    let Joke = await Random.GetJoke("BLUE");
    message.channel.send(Joke);
  }
};
