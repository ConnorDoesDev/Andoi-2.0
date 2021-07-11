const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");

const app = require("../../models/application/config.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "remquestions",
      desc: "Remove questions!",
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
      aliases: ["rq", "removequestions"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    let number = args[0];
    if (!number || isNaN(number) || number === "0")
      return message.channel.send({
        embeds: [
          new AndoiEmbed().setColor("RED").setDescription(lang.APP.PROVIDE_NUM),
        ],
      });

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

        let questions = db.questions;
        let num = Number(number) - 1;

        if (!questions[num])
          return message.channel.send({
            embeds: [
              new AndoiEmbed()
                .setColor("RED")
                .setDescription(lang.APP.QUESTION_NOT_EXIST),
            ],
          });

        questions.splice(num, 1);

        await db.updateOne({
          questions: questions,
        });

        return message.channel.send({
          embeds: [
            new AndoiEmbed()
              .setColor("GREEN")
              .setDescription(lang.APP.REM_QUESTIONS_DB),
          ],
        });
      }
    );
  }
};
