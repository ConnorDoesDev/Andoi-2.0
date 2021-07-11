const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const app = require("../../models/application/applied.js");
const ReactionMenu = require("../../struct/reactionmenu");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "review",
      desc: "Review an application",
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
    const conditional = {
      guildID: message.guild.id,
      hasApplied: true,
    };
    const results = await app.find(conditional);
    const array = [];
    if (!results.length)
      return message.channel.send({ content: lang.APP.NO_APPS });
    if (results && results.length) {
      for (const result of results) {
        try {
          const member = await message.guild.members.fetch(result.userID);

          array.push(
            `${lang.APP.APPLICATION} #${result.appID} | ${lang.APP.SUBMITTER}: ${member.user.tag}`
          );
        } catch {}
      }
    }
    const interval = 5;

    const embed = new AndoiEmbed()
      .setTitle(`${lang.APP.APP_REV}`)
      .setDescription(`\`\`\`\n${array.join("\n\n")}\`\`\`` || lang.APP.NO_APPS)
      .setColor("GREEN")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (array.length <= interval) {
      const range = array.length == 1 ? "[1]" : `[1 - ${array.length}]`;
      message.channel.send({
        embeds: [
          embed
            .setTitle(`${lang.APP.APP_REV} ${range}`)
            .setDescription(
              `\`\`\`\n${array.join("\n\n")}\`\`\`` || lang.APP.NO_APPS
            )
            .setColor("GREEN")
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            ),
        ],
      });
    } else {
      embed
        .setTitle(lang.APP.APP_REV)
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(
        this.client,
        message.channel,
        message.member,
        embed,
        array,
        interval
      );
    }
  }
};
