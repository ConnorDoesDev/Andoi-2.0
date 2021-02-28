const Command = require("../../struct/Command");
const { MessageEmbed } = require(`discord.js`);
const answers = [
  "Yes.",
  "No.",
  "My sources say yes",
  "Most likely.",
  "idk",
  "maybe sometime",
  "Outlook good.",
  "Signs point to yes.",
  "Definitely",
  "Absolutely",
  "Nope.",
  "No thanks, I won’t be able to make it.",
  "No Way!",
  " It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - definitely.",
  "You may rely on it.",
  "As I see it, yes.",
];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "8ball",
      desc: "Ask a question!",
      usage: "[question]",
      example: ["Am i a good programmer?"],
      category: "games",
      guildOnly: false,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["question"],
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    const question = args.join(" ");

    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = new MessageEmbed()
      .setTitle("8Ball")
      .addField("Question:", question)
      .addField("Answer:", answer)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send(embed);
  }
};
