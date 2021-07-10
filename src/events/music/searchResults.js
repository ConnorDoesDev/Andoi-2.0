const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const { Message } = require("discord.js");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { SearchResult } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "searchResults",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Message} message
   * @param {SearchResult} results
   * @param {String} query
   */
  async run(message, results, query) {
    const lang = await this.lang.getFile(message.guild);
    const embed = new AndoiEmbed()
      .setTitle(lang.MUSIC.RESULTS_QUERY(query))
      .setDescription(results.map((t, i) => `${i + 1}. ${t.name}`))
      .setFooter(lang.MUSIC.SEARCH_FOOTER);
    message.channel.send({ embeds: [embed] });
  }
};
