const Command = require("../../struct/Command");
const model = require("../../models/wrapper");
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
    const msg = await message.channel.send(`${this.client.emotes.loading}`);
    const timeDiff = msg.createdTimestamp - message.createdTimestamp;
    const wsp = this.client.ws.ping;
    let dataPing = Date.now();
    await model.findOne({});
    let dataPingNow = Date.now();
    let dataRealPing = dataPingNow - dataPing;
    const api_laten = await this.client.lang.get(
      message.guild,
      "CORE/API_LATENCY"
    );
    const msg_laten = await this.client.lang.get(
      message.guild,
      "CORE/MESSAGE_LATENCY"
    );
    const db_laten = await this.client.lang.get(
      message.guild,
      "CORE/DATABASE_LATENCY"
    );
    const embed = this.client.utils
      .embed()
      .setColor(this.client.settings.embed_main)
      .setDescription(
        [
          `**${api_laten}** \`${wsp}ms\``,
          `**${msg_laten}** \`${timeDiff}ms\``,
          `**${db_laten}** \`${dataRealPing}ms\``,
        ].join("\n")
      )
      .setTimestamp();

    return msg.edit("_ _", embed);
  }
};
