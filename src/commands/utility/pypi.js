const SearchCommand = require("../../struct/searchCommand");
const AndoiEmbed = require("../../struct/AndoiEmbed");

const BASE_URL = "https://developer.mozilla.org";

module.exports = class MDN extends SearchCommand {
  constructor(...args) {
    super(...args, {
      name: "pypi",
      desc: "Search the python developer docs",
      usage: "[item]",
      example: ["List"],
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["docItem"],
      voice: false,
      sameVoice: false,
    });
  }

  async search(_, query) {
    const res = await this.client.apis.pypiapi.search(query);
    return res;
  }

  searchResultFormatter(i) {
    return `${i.id}: ${i.description}.`;
  }

  async handleResult({ guild, author, channel }, { id }) {
    const res = await this.client.apis.pypiapi.info(id);
    const { description, name, command, date, packageLink } = res;

    channel.send(
      new AndoiEmbed(author)
        .setAuthor("PyPi", null, "https://pypi.org/")
        .setURL(packageLink)
        .setTitle(name)
        .setDescriptionFromBlockArray([
          [description.slice(0, 1024)],
          [`${date}`],
          [`${await this.lang.get(guild, "UTILITY/INSTALL_WITH")} ${command}`],
        ])
    );
  }
};
