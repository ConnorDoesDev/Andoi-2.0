const Command = require("../../struct/Command");
const { MessageEmbed } = require(`discord.js`);
const random = require("some-random-cat").Random;
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "meme",
      desc: "Find memes!",
      usage: "[]",
      category: "fun",
      guildOnly: false,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      voice: false,
      sameVoice: false,
    });
  }

  async run(message, args) {
    const subreddits = ["meme", "dankmemes", "danidev"];
    const randomSubReddit =
      subreddits[Math.floor(Math.random() * subreddits.length)];
    await someRandomCat
      .getMeme(randomSubReddit)
      .then((res) => {
        message.channel.send(
          new MessageEmbed()
            .setTitle(res.title)
            .setURL(`https://www.reddit.com/r/${randomSubReddit}`)
            .setImage(res.img)
            .setFooter(`👍 ${res.upvotes} | 💬 ${res.comments}`)
            .setAuthor(`From ${res.author}`)
            .setColor("RANDOM")
        );
      })
      .catch((error) => {
        message.channel.send(
          client.embedError(message, `Error while fetching response:\n${error}`)
        );
      });
  }
};
