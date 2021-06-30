const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "lyrics",
      desc: "search for lyrics",
      usage: "[song]",
      example: ["i won't look back"],
      category: "searcher",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["song"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, [...song]) {
    message.channel.startTyping();

    const playingSong = song;
    if (!playingSong)
      return message.reply({
        content: await message.t("SEARCHER/NO_SONG_PRO"),
      });
    const embed = new AndoiEmbed(message.author);
    const {
      response: {
        hits: [hit],
      },
    } = await this.client.apis.genius.findTrack(song);
    if (hit) {
      const {
        result: {
          song_art_image_thumbnail_url: thumbnailUrl,
          title_with_featured: title,
          primary_artist: { name: artist },
          url,
          path,
        },
      } = hit;
      const body = await this.client.apis.genius.loadLyrics(url);

      embed
        .setAuthor("Genius", "https://i.imgur.com/NmCTsoF.png")
        .setDescription(
          body.length >= 1900
            ? `${body.substr(0, 1900)}\n\n[${await message.t(
                "SEARCHER/FULL_LYRICS"
              )}](http://genius.com${path})`
            : body
        )
        .setThumbnail(thumbnailUrl)
        .setColor("BLUE")
        .setTitle(`${title} - ${artist}`)
        .setURL(`http://genius.com${path}`);
      return message.channel
        .send({ embeds: [embed] })
        .then(() => message.channel.stopTyping());
    } else {
      return message.reply({ content: message.t("SEARCHER/NO_SONG") });
    }
  }
};
