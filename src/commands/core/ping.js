const Command = require("../../struct/Command");
const model = require("../../models/guild");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      desc: "Get the bot latency",
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const msg = await message.channel.send({
      content: `${this.client.emotes.loading}`,
    });
    const lang = await this.lang.getFile(message.guild);
    const timeDiff = msg.createdTimestamp - message.createdTimestamp;
    const wsp = this.client.ws.ping;
    let dataPing = Date.now();
    await model.findOne({});
    let dataPingNow = Date.now();
    let dataRealPing = dataPingNow - dataPing;
    const api_laten = lang.CORE.API_LATENCY;
    const msg_laten = lang.CORE.MESSAGE_LATENCY;
    const db_laten = lang.CORE.DATABASE_LATENCY;
    const embed = new AndoiEmbed()
      .setColor(this.client.settings.embed_main)
      .setDescription(
        [
          `**${api_laten}** \`${wsp}ms\``,
          `**${msg_laten}** \`${timeDiff}ms\``,
          `**${db_laten}** \`${dataRealPing}ms\``,
        ].join("\n")
      )
      .setTimestamp();

    return msg.edit({
      content: `${this.client.emotes.success}`,
      embeds: [embed],
    });
  }
};
