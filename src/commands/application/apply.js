const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const app = require("../../models/application/config.js");
const sendQuestions = require("../../helpers/sendQuestions");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "apply",
      desc: "Apply for an application",
      category: "application",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
      premium: true,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    const closed = new AndoiEmbed()
      .setDescription(lang.APP.NO_QUEST)
      .setColor("RED");

    const closed2 = new AndoiEmbed()
      .setDescription(lang.APP.NO_APPLY_CONF)
      .setColor("RED");

    let db = await app.findOne({
      guildID: message.guild.id,
    });

    if (!db) {
      let newAppDB = new app({
        guildID: message.guild.id,
        questions: [],
        appToggle: false,
        appLogs: null,
      });
      await newAppDB.save().catch((err) => {
        console.log(err);
      });

      return message.channel.send({
        embeds: [closed],
      });
    }

    if (db.questions.length === 0 || db.questions.length < 1)
      return message.channel.send({ embeds: [closed] });
    if (
      db?.appLogs === null ||
      !db.appLogs ||
      !this.client.channels.cache.get(db.appLogs)
    )
      return message.channel.send({ embeds: closed2 });
    const channel = await message.guild.channels.cache.get(db.appLogs);
    if (!channel) return message.channel.send({ embeds: [closed] });
    await message.channel
      .send({
        embeds: [
          new AndoiEmbed()
            .setColor("GREEN")
            .setDescription(
              `${this.client.emotes.success} |${lang.APP.PRIVACY_DM}`
            ),
        ],
      })
      .then(() => sendQuestions(this.client, message, message.author, db, lang))
      .catch((err) => {
        console.log(err);
        return message.channel.send({
          content: `${this.client.emotes.error} ${lang.APP.COULD_NOT_DM(
            message
          )}`,
        });
      });
  }
};
