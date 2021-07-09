const Event = require("../../struct/Event");
const bot = require("../../bot");
const langManager = require("../../struct/LanguageManager");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Queue, Song } = require("distube");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "addSong",
      emitter: bot.player,
    });
    this.lang = new langManager(this.client);
  }
  /**
   *
   * @param {Queue} queue
   * @param {Song} song
   */
  async run(queue, song) {
    const lang = await this.lang.getFile(queue.textChannel.guild);
    const embed = new AndoiEmbed()
      .setTitle(lang.MUSIC.ADDED_SONG(song))
      .addField(lang.MUSIC.AUTHOR, song.uploader.name)
      .addField(lang.MUSIC.REQUEST, song.user.tag)
      .addField(lang.MUSIC.VIEWS, song.views)
      .addField(lang.MUSIC.DURATION, song.formattedDuration)
      .setURL(song.url)
      .setThumbnail(song.thumbnail);
    queue.textChannel.send({ embeds: [embed] });
  }
};
