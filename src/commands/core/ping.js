const Command = require("../../struct/Command");
const model = require("../../models/wrapper");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      desc: "Get the bot latency",
    });
  }

  async run(message) {
    const msg = await message.channel.send("Pinging...");
    const timeDiff = msg.createdTimestamp - message.createdTimestamp;
    const wsp = this.client.ws.ping;
    let dataPing = Date.now();
    await model.findOne({});
    let dataPingNow = Date.now();
    let dataRealPing = dataPingNow - dataPing;
    const embed = this.client.utils
      .embed()
      .setColor(this.client.settings.embed_main)
      .setDescription(
        [
          `**Websocket:** \`${wsp}ms\``,
          `**Delay:** \`${timeDiff}ms\``,
          `**Database:** \`${dataRealPing}ms\``,
        ].join("\n")
      )
      .setTimestamp();

    return message.channel.send(embed);
  }
};
