const Command = require("../../struct/Command");
const util = require("util");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "eval",
      desc: "Evaluate some code",
      usage: "[code]",
      example: ["help"],
      category: "developer",
      guildOnly: true,
      ownerOnly: true,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["code"],
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    const toEval = args.join(" ");
    try {
      await eval("(async () =>  { " + toEval + " } )();").then((e) => {
        let evaluated = e;
        evaluated = util.inspect(evaluated, { depth: 0 });
        const type = typeof evaluated;
        const embed = new AndoiEmbed(message.author)
          .setTitle("Eval Command")
          .addField("**Input:**", `\`\`\`js\n${toEval}\`\`\``)
          .addField("**Output:**", ` \`\`\`js\n${evaluated}\`\`\``)
          .addField(
            "**Type:**",
            ` \`\`\`js\n${this.client.utils.capitalise(type)}\`\`\``
          )
          .setColor("BLUE")
          .setTimestamp()
          .setFooter(message.author.username);

        message.channel.send({ embeds: [embed] });
      });
    } catch (e) {
      return message.channel.send({
        content: `Something went wrong!  \`\`\`${e}\`\`\`  `,
      });
    }
  }
};
