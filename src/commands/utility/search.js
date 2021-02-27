const SearchCommand = require("../../struct/searchCommand");
const moment = require("moment");
const AndoiEmbed = require("../../struct/AndoiEmbed");

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
      args: true,
      voice: false,
      sameVoice: false,
    });
  }

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
    { author, channel },
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
          "Visual studio code marketplace",
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
          ["Made by", publisher.publisherName],
          [
            "Installs",
            installs.toLocaleString(),
            `${stars} (${Math.round(ratingCount)})`,
          ],
          [categories.join(", "), tags.map((t) => `\`${t}\``).join(", ")],
          ["Last Update", moment(lastUpdated).fromNow(), version],
          [
            `[License](${url}/license)`,
            `[Changelog](${url}/changelog)`,
            `[Install](https://vscoderedirect.switchblade.xyz/${publisher.publisherName}.${extensionName})`,
          ],
        ])
    );
  }
};
