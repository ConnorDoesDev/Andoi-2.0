const Command = require("../../struct/Command");
const Discord = require("discord.js");
const math = require("mathjs");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "calculate",
      desc: "Calculate somethng...",
      aliases: ["calc"],
      usage: "[number]",
      example: ["123 * 152"],
      category: "fun",
      guildOnly: false,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["number"],
      voice: false,
      sameVoice: false,
    });
  }

  run(message, args) {
    let result;
    try {
      result = math.evaluate(
        args
          .join(" ")
          .replace(/[x]/gi, "*")
          .replace(/[,]/g, ".")
          .replace(/[÷]/gi, "/")
      );
    } catch (e) {
      return message.channel.send(
        "**Enter Valid Calculation!**\n\n**List of Calculations** - \n1. **sqrt equation** - `sqrt(3^2 + 4^2) = 5`\n2. **Units to Units** - `2 inch to cm = 0.58`\n3. **Complex Expressions Like** - `cos(45 deg) = 0.7071067811865476`\n4. **Basic Maths Expressions** - `+, -, ^, /, decimals` = **2.5 - 2 = 0.5**"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        `${this.client.user.username} Calculator`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(
        "**Operation**",
        `\`\`\`Js\n${args
          .join("")
          .replace(/[x]/gi, "*")
          .replace(/[,]/g, ".")
          .replace(/[÷]/gi, "/")}\`\`\``
      )
      .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
      .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(embed);
  }
};
