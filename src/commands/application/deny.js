const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const App = require("../../models/application/config");
const Paste = require("../../models/application/applied");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "deny",
      desc: "Deny an application",
      usage: "[id]",
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
    let app = await App.findOne({
      guildID: message.guild.id,
    });

    if (!app) {
      app = new App({
        guildID: message.guild.id,
      });

      await app.save();
      app = await App.findOne({
        guildID: message.guild.id,
      });
    }

    const id = args[0];
    if (!id)
      return message.reply({
        content: lang.APP.NO_ID_PROVIDE,
      });
    const paste = await Paste.findOne({
      guildID: message.guild.id,
      appID: id,
    });
    const member = message.guild.members.cache.get(paste.userID);

    if (!paste)
      return message.channel.send({
        content: `${this.client.emotes.error} ${lang.APP.NOT_FIND_ID}`,
      });

    let reason = args.slice(1).join(" ");
    if (!reason) reason = `None`;
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    if (paste.status === "approved")
      return message.channel.send({
        content: `${this.client.emotes.error} | ${lang.APP.ALREADY_APPROVE}`,
      });
    if (paste.status === "declined")
      return message.channel.send({
        content: `${this.client.emotes.error} | ${lang.APP.ALREADY_DENY}`,
      });

    (paste.status = "declined"), await paste.save().catch(() => {});
    await paste.deleteOne();
    message.channel.send({
      embeds: [
        new AndoiEmbed()
          .setColor("GREEN")
          .setTitle(lang.APP.APPLICATION)
          .setDescription(
            `${this.client.emotes.success} ${lang.APP.DENIED(
              id,
              message,
              reason
            )}`
          ),
      ],
    });
    member
      .send({
        embeds: [
          new AndoiEmbed()
            .setColor("RED")
            .setTitle(lang.APP.APPLICATION)
            .setDescription(
              `${this.client.emotes.error} ${lang.APP.DENY_DM(
                id,
                message,
                reason,
                member
              )}`
            ),
        ],
      })
      .catch(() => {
        message.channel.send({
          content: lang.APP.NVM_DENY_DM(member),
        });
      });
  }
};
