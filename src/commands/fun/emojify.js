const Command = require("../../struct/Command");
const { MessageEmbed } = require(`discord.js`);

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "emojify",
      desc: "emojify text!",
      usage: "[text]",
      example: ["Haha"],
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

  run(message, args) {
    const specialChars = {
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      "#": ":hash:",
      "*": ":asterisk:",
      "?": ":grey_question:",
      "!": ":grey_exclamation:",
      " ": "   ",
    };

    const emojified = `${args.join(" ")}`
      .toLowerCase()
      .split("")
      .map((letter) => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}: `;
        } else if (specialChars[letter]) {
          return `${specialChars[letter]} `;
        }
        return letter;
      })
      .join("");

    if (emojified.length > 2000) {
      return message.channel.send(
        "The emojified message exceeds 2000 characters."
      );
    }

    message.channel.send(emojified);
  }
};
