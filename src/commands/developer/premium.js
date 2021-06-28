const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const premium = require("../../models/premium");
const voucher = require("voucher-code-generator");
module.exports = class PremiumCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "premium",
      desc: "Ye owner only",
      usage: "[option]",
      example: ["add"],
      category: "developer",
      guildOnly: true,
      ownerOnly: true,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["plantype", "amount"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    let expireTime;

    if (args[0] === "month") {
      expireTime = Date.now() + 2592000000;
    } else if (args[0] === "year") {
      expireTime = Date.now() + 2592000000 * 12;
    }
    let amount;
    if (args[1]) {
      amount = args[1];
    } else {
      amount = 1;
    }
    const arr = [];
    for (let i = 0; i < amount; i++) {
      const generated = voucher.generate({
        pattern: "###-###-###-###",
      });
      const code = generated.toString().toUpperCase();
      const tryFind = await premium.findOne({
        code,
      });
      if (!tryFind) {
        const orem = new premium({
          code,
          expires: expireTime,
          plan: args[0],
        });
        await orem.save();
        arr.push(`\`${i + 1}-\` ${code}`);
      }
    }
    const moment = require("moment");
    const embed = new AndoiEmbed()
      .setSuccess()
      .setTitle("Generated premium codes successfully!")
      .setDescription(
        `Generated amount: ${arr.length} Codes:\n\n${arr.join(
          "\n"
        )}\n\n Type: ${args[0]}\n\n Expires: ${moment(expireTime).format(
          "dddd, MMMM Do YYYY"
        )} `
      );
    message.channel.send({ embeds: [embed] });
  }
};
