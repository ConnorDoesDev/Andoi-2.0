const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { default: fetch } = require("node-fetch");
const { Message } = require("discord.js");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "reddit",
      desc: "Get an redit post",
      usage: "[reddit]",
      example: ["discord"],
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["subreddit"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   *
   * @param {Message} message
   * @param {String} sub
   * @returns
   */

  async run(message, [sub]) {
    const data = await fetch(
      `https://www.reddit.com/r/${encodeURIComponent(sub)}/random.json`
    ).then((re) => re.json());
    try {
      const randomIndex = Math.floor(
        Math.random() * data[0].data.children.length
      );
      const children = data[0].data.children[randomIndex];
      const permaLink = children.data.permalink;
      const url = `https://reddit.com${permaLink}`;
      const image = children.data.url;

      const embed = new AndoiEmbed(message.author)
        .setTitle(children.data.subreddit)
        .setURL(url)
        .setImage(image)
        .setFooter(message.author.username)
        .setTimestamp();
      message.channel.send(embed);
    } catch (err) {
      console.log(err);
      return message.channel.send(this.client.lang.get(message.guild, "ERROR"));
    }
  }
};
