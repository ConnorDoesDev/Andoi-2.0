const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");

const app = require("../../models/application/config.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "questions",
      desc: "View the guild's questions.",
      category: "application",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["MANAGE_GUILD"],
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
    await app.findOne(
      {
        guildID: message.guild.id,
      },
      async (err, db) => {
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
            embeds: [
              new AndoiEmbed()
                .setColor("RED")
                .setDescription(lang.APP.NO_QUESTIONS),
            ],
          });
        }

        if (db.questions.length === 0 || db.questions.length < 1)
          return message.channel.send({
            embeds: [
              new AndoiEmbed()
                .setColor("RED")
                .setDescription(lang.APP.NO_QUESTIONS),
            ],
          });

        let text = "";
        let arrLength = db.questions.length;
        let arr = db.questions;
        for (let i = 0; i < arrLength; i++) {
          text += `\`${Number([i]) + 1}\` - ${arr[i]}\n`;
        }
        message.channel.send({
          embeds: [
            new AndoiEmbed()
              .setColor("GREEN")
              .setDescription(`${lang.APP.QUESTIONS}: \n${text}`),
          ],
        });
      }
    );
  }
};
