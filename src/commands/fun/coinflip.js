const Command = require("../../struct/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "coinflip",
      desc: "Do a coinflip.",
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

  run(message, args) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "Heads";
    else result = "Tails";
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**${message.member.displayName} Flipped ${result}**!`);
    message.channel.send(embed);
  }
};
