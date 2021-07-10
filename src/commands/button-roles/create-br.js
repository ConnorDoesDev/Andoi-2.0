const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message, Util } = require("discord.js");
const btnroles = require("../../struct/buttonRoles");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "create-br",
      desc: "Create button roles",
      category: "button-roles",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["ADMINISTRATOR"],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
      aliases: ["createbr"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const brmanager = new btnroles();
    let emojis;
    let roles;
    const { guild } = message;
    const filter = (m) => m.author.id === message.author.id;
    const ch = this.findChannel(message, args, false);
    if (!ch) {
      return message.channel.send(
        await this.client.lang.get(
          message.guild,
          "BUTTON_ROLES/PROVIDE_CHANNEL"
        )
      );
    }

    const roleMsgs = await this.awaitReply(
      message,
      await this.client.lang.get(message.guild, "BUTTON_ROLES/PROVIDE_ROLE"),
      filter
    );
    const roleMsg = roleMsgs;
    roles = parseRoles(roleMsg, guild);

    const emojiMsgs = await this.awaitReply(
      message,
      await this.client.lang.get(message.guild, "BUTTON_ROLES/PROVIDE_EMOJI"),
      filter
    );

    const emojiMsg = emojiMsgs;
    emojis = parseEmojis(emojiMsg);

    const channel = guild.channels.cache.get(ch.id);
    if (!channel) {
      return message.channel.send({
        content: await this.client.lang.get(
          message.guild,
          "BUTTON_ROLES/CHANNEL_NOT"
        ),
      });
    }

    const embed = new AndoiEmbed(this.client.user)
      .setTitle(await this.client.lang.get(message.guild, "BUTTON_ROLES/BTN"))
      .setDescription(`${createDescription(roles, emojis)}`);
    const reactions = [];

    for (let i = 0; i < roles.length; i++) {
      reactions.push({
        name: roles[i].name,
        role_id: roles[i].id,
        emoji: emojis[i].toString(),
      });
    }
    const final = {
      arr: reactions,
    };
    brmanager.addrole(final);
    btnroles.create({
      message,
      content: embed,
      role: brmanager,
      channelID: channel.id,
      emojicontent: emojiMsg,
      rolecontent: roleMsg,
    });
  }
  async awaitReply(msg, question, filter, limit = 60000) {
    let e = new MessageEmbed().setDescription(question).setColor("RANDOM");
    await msg.channel.send(e);

    return msg.channel
      .awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
      .then((collected) => collected.first().content)
      .catch(() => false);
  }
};
function createDescription(roles, emojis) {
  const strings = [];

  for (let i = 0; i < roles.length; i++) {
    strings.push(`${emojis[i]}: ${roles[i]}`);
  }

  return strings.join("\n");
}

function parseRoles(msg, guild) {
  const content = msg.trim().split(/ +/g);

  // Remove any duplicates
  const filtered = [...new Set(content)];

  let roles = [];

  filtered.forEach(async (roleId) => {
    const role =
      guild.roles.cache.get(roleId) || (await guild.roles.fetch(roleId));

    roles = [...roles, role];
    return role;
  });

  return roles;
}
/**
 *
 * @param {Message} msg
 * @returns
 */
function parseEmojis(msg) {
  let content = msg.trim().split(/ +/g);

  content = content.filter((s) => {
    return true;
  });

  return [...new Set(content)];
}
