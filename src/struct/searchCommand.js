const { MessageEmbed } = require("discord.js");
const Command = require("./Command.js");
module.exports = class SearchCommand extends Command {
  constructor(...args) {
    super(...args);
    this.maxResults = 10;
  }

  async run(context, query) {
    const { channel, author } = context;
    channel.startTyping();
    const resultsAll = await this.search(context, query);
    if (!Array.isArray(resultsAll))
      throw new TypeError(
        `SearchCommand.search needs to return an array. ${typeof resultsAll} given in ${
          this.constructor.name
        }.`
      );
    const results = resultsAll.slice(0, this.maxResults);

    if (!results) return channel.send("Failed to find results");
    if (!results.length) return channel.send("No results!");
    if (results.length === 1)
      return this.handleResult(context, results[0]).then(() =>
        channel.stopTyping()
      );
    const description = results.map(
      (item, i) =>
        `\`${this.formatIndex(i, results)}\`. ${this.searchResultFormatter(
          item,
          context
        )}`
    );
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Type a number to respond!")
      .setAuthor(`Results: ${query}`, this.client.user.displayAvatarURL())
      .setDescription(description);
    await channel.send(embed).then(() => channel.stopTyping());

    this.awaitResponseMessage(context, results);
  }

  async search() {
    throw new TypeError(
      `SearchCommand.search needs return the results in ${this.constructor.name}.`
    );
  }

  searchResultFormatter(item) {
    return item;
  }

  formatIndex(index, results) {
    index++;
    if (results.length < 10) return index;
    return index.toString().padStart(2, "0");
  }

  async awaitResponseMessage(context, results) {
    const { author, channel } = context;
    const filter = (c) =>
      c.author.equals(author) &&
      this.verifyCollected(c.content, results.length);

    channel.awaitMessages(filter, { time: 10000, max: 1 }).then((collected) => {
      if (collected.size > 0) {
        const result =
          results[Math.round(Number(collected.first().content)) - 1];
        this.handleResult(context, result);
      }
    });
  }

  verifyCollected(selected, length) {
    const number = Math.round(Number(selected));
    return number <= length && !isNaN(number) && number > 0;
  }

  handleResult() {
    throw new TypeError(
      `SearchCommand.handleResult should handle the result in ${this.constructor.name}.`
    );
  }
};
