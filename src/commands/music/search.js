const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "search",
      desc: "Search for a song.",
      usage: "[song]",
      example: ["lets go dababy"],
      category: "music",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["song"],
      voice: true,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const results = await this.client.player.search(args.join(" "));
    if (!results || results.length === 0)
      return this.player.emit("searchNoResults", message, args.join(" "));
    const query = args.join(" ");
    this.client.player.emit("searchResults", message, results, query);
    const ansewers = await message.channel
      .awaitMessages({
        filter: (res) => res.author.id === message.author.id,
        max: 1,
      })
      .then((answers) => {
        const ans = answers.first();
        if (!ans || ans === "cancel") {
          this.client.player.emit("searchCancel", message, query);
          return;
        }
        const index = parseInt(ans.content, 10);
        if (isNaN(index) || index > results.length || index < 1) {
          this.client.player.emit("searchInvalidAnswer", message, ans, query);
          return;
        }
        const result = results[index - 1];
        this.client.player.play(message, result.url);
      });
  }
};
