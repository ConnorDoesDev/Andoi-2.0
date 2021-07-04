const InteractionClass = require("../struct/Interaction");
const { Interaction } = require("discord.js");
const model = require("../models/guild");
const AndoiEmbed = require("../struct/AndoiEmbed");
module.exports = class PingInteraction extends InteractionClass {
  constructor(...args) {
    super(...args, {
      name: "ping",
      description: "Check my ping!",
    });
  }
  /**
   * @param {Interaction} interaction
   */
  async run(interaction) {
    const lang = await this.lang.getFile(interaction.guild);
    const ws = this.client.ws.ping;
    const dataPing = Date.now();
    await model.findOne({});
    const dataPingNow = Date.now();
    const dataRealPing = dataPingNow - dataPing;
    const embed = new AndoiEmbed()
      .setColor(this.client.settings.embed_main)
      .setDescription([
        `**${lang.CORE.API_LATENCY}** \`${ws}\`ms`,
        `**${lang.CORE.DATABASE_LATENCY}** \`${dataRealPing}\`ms`,
      ]);

    await interaction.reply({ embeds: [embed] });
  }
};
