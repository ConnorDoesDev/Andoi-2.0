const { MessageEmbed } = require(`discord.js`);
const fetch = require("node-fetch");
const Command = require("../../struct/Command");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "amongus-eject",
      desc: "Eject somebody",
      usage: "[user]",
      example: ["@mom"],
      aliases: ["amongeject"],
      category: "fun",
      guildOnly: false,
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
    try {
      const user =
        message.mentions.users.first() ||
        (args.length > 0
          ? message.users.cache
              .filter((e) =>
                e.username.toLowerCase().includes(args.join(" ").toLowerCase())
              )
              .first()
          : message.author) ||
        message.author;
      const imp = [true, false];
      const imposter = imp[Math.floor(Math.random() * imp.length)];
      const crew = [
        "black",
        "blue",
        "brown",
        "cyan",
        "darkgreen",
        "lime",
        "orange",
        "pink",
        "purple",
        "red",
        "white",
        "yellow",
      ];
      const crewmate = crew[Math.floor(Math.random() * crew.length)];

      const data = await fetch(
        `https://vacefron.nl/api//ejected?name=${user.username}&impostor=${imposter}&crewmate=${crewmate}`
      );

      const embed = new MessageEmbed()
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.displayAvatarURL()
        )
        .setTitle(
          `${message.author.username} decided to eject ${user.username}`
        )
        .setColor("#FF0000")
        .setImage(`${data.url}`);

      message.channel.send(embed);
    } catch (err) {
      const embed2 = new MessageEmbed()
        .setTitle(
          ":x: Something went wrong.\n  Note : It won't work if the User contains Unwanted characters in his Username."
        )
        .setColor("FF0000");
      message.channel.send(embed2);
    }
  }
};
