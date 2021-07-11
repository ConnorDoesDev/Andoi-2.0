const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const App = require("../../models/application/config");
const Paste = require("../../models/application/applied");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "approve",
      desc: "Approve an application",
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

    if (!paste)
      return message.channel.send({
        content: `${this.client.emotes.error} ${lang.APP.NOT_FIND_ID}`,
      });
    const member = message.guild.members.cache.get(paste.userID);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `No reason.`;
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    if (paste.status === "approved")
      return message.channel.send({
        content: `${this.client.emotes.error} | ${lang.APP.ALREADY_APPROVE}`,
      });
    if (paste.status === "declined")
      return message.channel.send({
        content: `${this.client.emotes.error} | ${lang.APP.ALREADY_DENY}`,
      });

    (paste.status = "approved"), await paste.save().catch(() => {});
    await paste.deleteOne();

    const add_role = message.guild.roles.cache.get(app.add_role);
    if (add_role) {
      await member.roles.add(add_role).catch(() => {});
    }
    message.channel.send({
      embeds: [
        new AndoiEmbed()
          .setColor("GREEN")
          .setTitle(lang.APP.APPLICATION)
          .setDescription(
            `${this.client.emotes.success} ${lang.APP.APPROVED(
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
            .setColor("GREEN")
            .setTitle(`Form Approved!`)
            .setDescription(lang.APP.APPROVED_DM(id, message, reason, member)),
        ],
      })
      .catch(() => {
        message.channel.send({
          content: lang.APP.NVM_DM(member, "approve"),
        });
      });
  }
};
