const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const filters = require("../../assets/json/filters.json");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "filters",
      desc: "Check the current filters!",
      category: "music",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: true,
      sameVoice: false,
      playing: true,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    const conf = await this.client.getConfig(message.guild);

    const disabledEmoji = this.client.emotes.error;
    const enabledEmoji = this.client.emotes.success;

    const filtersStatuses = [[], []];

    Object.keys(filters).forEach((filterName) => {
      const array =
        filtersStatuses[0].length > filtersStatuses[1].length
          ? filtersStatuses[1]
          : filtersStatuses[0];
      array.push(
        filters[filterName] +
          " : " +
          (this.client.player.getQueue(message).filters[filterName]
            ? enabledEmoji
            : disabledEmoji)
      );
    });

    message.channel.send({
      embeds: [
        {
          color: "ORANGE",
          fields: [
            {
              name: "Filters",
              value: filtersStatuses[0].join("\n"),
              inline: true,
            },
            {
              name: "** **",
              value: filtersStatuses[1].join("\n"),
              inline: true,
            },
          ],
          timestamp: new Date(),
          description: lang.MUSIC.ENABLE_FILTER(conf.prefix),
        },
      ],
    });
  }
};
