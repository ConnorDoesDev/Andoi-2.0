const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");

const app = require("../../models/application/config.js");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "appconfig",
      desc: "Change the application config!",
      category: "application",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["MANAGE_GUILD"],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      premium: true,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    let guiild = await app.findOne({ guildID: message.guild.id });
    if (!guiild) {
      guiild = new app({ guildID: message.guild.id });
    }
    const lang = await this.lang.getFile(message.guild);
    const filter = (res) => res.author.id === message.author.id;
    const option = args[0];

    if (!option)
      return message.channel.send({ content: lang.APP.INVALID_OPTION });
    switch (option) {
      case "logs":
        let channel;
        if (args[1]) channel = args[1];
        if (!args[1])
          channel = await this.awaitReply(
            message,
            lang.APP.CHANNEL_SELECT,
            filter
          );
        const finalChan = this.client.resolveChannel(channel, message.guild);
        if (!finalChan)
          return message.reply({ content: lang.APP.INVALID_CHANNEL });

        guiild.appLogs = finalChan.id;
        guiild.save();

        message.channel.send({ content: lang.APP.CHANNEL_NOW(finalChan) });
        break;
      case "enable":
        guiild.appToggle = true;
        guiild.save();

        message.channel.send({ content: lang.APP.ENABLE });
        break;
      case "disable":
        guiild.appToggle = false;
        guiild.save();

        message.channel.send({ content: lang.APP.DISABLE });
        break;
      case "acceptedrole":
        let channel1;
        if (args[1]) channel1 = args[1];
        if (!args[1])
          channel1 = await this.awaitReply(
            message,
            lang.APP.ROLE_SELECT,
            filter
          );
        const finalChan1 = this.client.resolveRole(channel1, message.guild);
        if (!finalChan1)
          return message.reply({ content: lang.APP.INVALID_ROLE });

        guiild.add_role = finalChan1.id;
        guiild.save();

        message.channel.send({ content: lang.APP.ROLE_NOW(finalChan1) });
        break;
      default:
        message.channel.send({ content: lang.APP.INVALID_OPTION });
    }
  }
  async awaitReply(msg, question, filter, limit = 60000) {
    let e = new AndoiEmbed().setDescription(question).setColor("RANDOM");
    await msg.channel.send({ embeds: [e] });

    return msg.channel
      .awaitMessages({ filter, max: 1, time: limit, errors: ["time"] })
      .then((collected) => collected.first().content)
      .catch(() => false);
  }
};
