const Command = require("../../struct/Command");
const Random = require("srod-v2");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "fact",
      desc: "Get a fact!",
      usage: "[]",
      example: [""],
      category: "fun",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    let Fact = await Random.GetFact("BLUE");
    message.channel.send(Fact);
  }
};
