const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");

const app = require("../../models/application/config");
const { Message } = require("discord.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "addQuestions",
      desc: "Add questions to the application.",
      usage: "[questions]",
      example: ["hello | bye"],
      category: "application",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["MANAGE_GUILD"],
      botPerms: [],
      nsfw: false,
      args: ["questions"],
      voice: false,
      sameVoice: false,
      premium: true,
      aliases: ["aq", "addquestion"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    let questions = args.slice(0).join(" ");
    const lang = await this.lang.getFile(message.guild);

    let maxQuestions = 25;
    let split = questions.split("|");

    await app.findOne(
      {
        guildID: message.guild.id,
      },
      async (err, db) => {
        let arr = [];

        if (!db) {
          let actualArr = arr.concat(split);
          if (actualArr.length > maxQuestions) {
            return message.channel.send({
              embeds: [
                new AndoiEmbed()
                  .setError()
                  .setDescription(lang.APP.MAX_QUESTIONS(maxQuestions)),
              ],
            });
          }
          let newAppDB = new app({
            guildID: message.guild.id,
            questions: actualArr,
            appToggle: false,
            appLogs: null,
          });
          await newAppDB.save().catch((err) => {
            console.log(err);
          });

          return message.channel.send({
            embeds: [
              new AndoiEmbed()
                .setSuccess()
                .setDescription(lang.APP.SUCCESS_ADD),
            ],
          });
        }

        let ar = await db.questions;
        let actualArr = ar.concat(split);

        if (actualArr.length > maxQuestions) {
          return message.channel.send({
            embeds: [
              new AndoiEmbed()
                .setError()
                .setDescription(lang.APP.MAX_QUESTIONS(maxQuestions)),
            ],
          });
        }
        await db.updateOne({
          questions: actualArr,
        });

        return message.channel.send({
          embeds: [
            new AndoiEmbed(message.author)
              .setSuccess()
              .setDescription(lang.APP.SUCCESS_ADD),
          ],
        });
      }
    );
  }
};
