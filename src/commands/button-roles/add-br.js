const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message, Util } = require("discord.js");
const btnroles = require("../../struct/buttonRoles");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "add-br",
      desc: "Add button roles",
      category: "button-roles",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["ADMINISTRATOR"],
      botPerms: [],
      nsfw: false,
      args: ["message id"],
      voice: false,
      sameVoice: false,
      aliases: ["addbr", "addb"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    let emojis;
    let roles;
    const { guild } = message;
    const filter = (m) => m.author.id === message.author.id;

    const roleMsgs = await message.awaitReply(
      await this.client.lang.get(message.guild, "BUTTON_ROLES/PROVIDE_ROLE"),
      filter
    );
    const roleMsg = roleMsgs;
    roles = parseRoles(roleMsg, guild);

    const emojiMsgs = await message.awaitReply(
      await this.client.lang.get(message.guild, "BUTTON_ROLES/PROVIDE_EMOJI"),
      filter
    );

    const emojiMsg = emojiMsgs;
    emojis = parseEmojis(emojiMsg);
    const reactions = [];

    for (let i = 0; i < roles.length; i++) {
      reactions.push({
        name: roles[i].name,
        role_id: roles[i].id,
        emoji: emojis[i].toString(),
      });
    }

    btnroles.add({
      message,
      messageID: args[0],
      client: this.client,
      roleconf: reactions,
    });
  }
};

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
    // Remove custom emojis
    if (s.split(":").length === 1 ? false : true) {
      const emo = Util.parseEmoji(s);
      return emo.id;
    }
    return true;
  });

  return [...new Set(content)];
}
