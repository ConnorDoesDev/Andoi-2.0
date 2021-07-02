const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const guildModel = require("../../models/guild");
const premiumModel = require("../../models/premium");
const voucher = require("voucher-code-generator");
module.exports = class RedeeemCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "redeem",
      desc: "Redeem a premium code!",
      usage: "[code]",
      example: ["123-456-789-123"],
      category: "core",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["code"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const code = args[0];
    const guildConfig = await guildModel.findOne({
      guild: message.guild.id,
    });
    if (guildConfig?.premium?.enabled) {
      return message.channel.send({
        content: await this.client.lang.get(message.guild, "CORE/HAS_PREMIUM"),
      });
    }
    const premium = await premiumModel.findOne({
      code: code,
    });
    if (!premium) {
      return message.send({
        content: await this.client.lang.get(
          message.guild,
          "CORE/INVALID_PREMIUM"
        ),
      });
    }

    const moment = require("moment");
    const expire = moment(Number(premium.expires)).format(
      "dddd, MMMM, Do YYYY HH:mm:ss"
    );
    guildConfig.premium = {
      enabled: true,
      redeemedAt: Date.now(),
      redeemedBy: message.author.id,
      expiresAt: premium.expires,
      plan: premium.plan,
    };
    await guildConfig.save();
    await premium.deleteOne();
    const id = voucher.generate({
      pattern: "###########",
    });
    const embed = new AndoiEmbed(message.author)
      .setSuccess()
      .setDescription(
        await this.client.lang.get(
          message.guild,
          "CORE/REDEEMED_SUCCESSFULLY",
          {
            id,
            guildname: message.guild.name,
            expires: expire,
          }
        )
      )
      .setFooter(message.guild.name);
    message.channel.send({ embeds: [embed] });
  }
};
