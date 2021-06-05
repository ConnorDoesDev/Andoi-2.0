const SearchCommand = require("../../struct/searchCommand");
const moment = require("moment");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");

const EXTENSION_URL = "https://marketplace.visualstudio.com/items/";

module.exports = class VSCodeExtensions extends SearchCommand {
  constructor(...args) {
    super(...args, {
      name: "vscode",
      desc: "search an extension on visual studio code!",
      usage: "[extension]",
      example: ["material theme"],
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["extension"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   *
   * @param {Message} context
   * @param {String} param1
   * @returns
   */
  async search(context, [query]) {
    const res = await this.client.apis.vscodeextensions.search(query);
    return res.data.results[0].extensions;
  }

  searchResultFormatter(i) {
    return `[${i.displayName} - ${i.publisher.displayName}](${EXTENSION_URL}${i.publisher.publisherName}.${i.extensionName})`;
  }

  getRatingEmojis(rating) {
    return "⭐".repeat(Math.floor(rating));
  }

  async handleResult(
    { author, channel, guild },
    {
      displayName,
      shortDescription,
      publisher,
      versions,
      extensionName,
      statistics,
      categories,
      tags,
    }
  ) {
    const { assetUri, lastUpdated, version } = versions[0];

    const [
      { value: installs },
      { value: averageRating },
      { value: ratingCount },
    ] = statistics;
    const stars = this.getRatingEmojis(averageRating);

    const url = `${EXTENSION_URL}${publisher.publisherName}.${extensionName}`;

    channel.send(
      new AndoiEmbed(author)
        .setColor("BLUE")
        .setAuthor(
          await this.client.lang.get(guild, "UTILITY/VS_MARKET"),
          null,
          "https://marketplace.visualstudio.com/vscode"
        )
        .setURL(url)
        .setThumbnail(
          `${assetUri}/Microsoft.VisualStudio.Services.Icons.Default`
        )
        .setTitle(displayName)
        .setDescriptionFromBlockArray([
          [shortDescription],
          [
            await this.client.lang.get(guild, "UTILITY/MADE_BY"),
            publisher.publisherName,
          ],
          [
            await this.client.lang.get(guild, "UTILITY/INSTALLS"),
            installs.toLocaleString(),
            `${stars} (${Math.round(ratingCount)})`,
          ],
          [categories.join(", "), tags.map((t) => `\`${t}\``).join(", ")],
          [
            await this.client.lang.get(guild, "UTILITY/LAST_UPDATE"),
            moment(lastUpdated).fromNow(),
            version,
          ],
          [
            `[${await this.client.lang.get(
              guild,
              "UTILITY/LICENSE"
            )}](${url}/license)`,
            `[${await this.client.lang.get(
              guild,
              "UTILITY/CHANGELOG"
            )}](${url}/changelog)`,
            `[${await this.client.lang.get(
              guild,
              "UTILITY/INSTALL"
            )}](https://vscode.andoi.workers.dev/${
              publisher.publisherName
            }.${extensionName})`,
          ],
        ])
    );
  }
};
