const MessageButton = require("./MessageButton");
const {
  MessageEmbed,
  Message,
  MessageActionRow,
  Client,
  Util,
} = require("discord.js");
const AndoiEmbed = require("./AndoiEmbed");
const model = require("../models/buttonroles");
class buttonroles {
  constructor() {
    this.roles = [];
    return this;
  }

  /**
   *
   * @param {arr} color - Button Color [optional]
   */
  addrole({ arr }) {
    const color = "blurple";
    for (const item of arr) {
      const label = item.name;
      const regex = new RegExp(/(<a?)?:\w+:(\d{18}>)?/g);
      let emojie;
      if (regex.test(item.emoji)) {
        const e = Util.parseEmoji(item.emoji);
        emojie = item.emoji.replace(/(<a?)?:\w+:(\d{18}>)?/g, e.id);
      } else {
        emojie = item.emoji;
      }
      const role = item.role_id;
      const emoji = emojie;
      this.roles.push({ color: color, label: label, emoji: emoji, role: role });
    }
    return this;
  }
  toJSON() {
    return { roles: this.roles };
  }
  /**
   *
   * @param {string} messageID
   * @param {string} roleID
   */
  static async delete({ client, messageID }) {
    const m = await model.findOne({ messageID });
    if (!m) throw new Error("messageID was not provided");
    const channel = client.channels.cache.get(m.channelID);
    if (!channel) throw new Error("channel not found.");
    const msg = await channel.messages.fetch(messageID);
    if (!msg) throw new Error("message not found.");
    await m.deleteOne();
    msg.delete();
  }
  /**
   *
   * @param {Client} client
   * @param {String} messageID
   * @param {String} roleID
   */
  static async add({ client, messageID, roleconf, message }) {
    const m = await model.findOne({ messageID });
    if (!m) throw new Error("messageID was not provided");
    const channel = client.channels.cache.get(m.channelID);
    if (!channel) throw new Error("channel not found.");
    const msg = await channel.messages.fetch(messageID);
    if (!msg) throw new Error("message not found.");
    const roles = m.roles;
    for (const item of roleconf) {
      const label = item.name;
      const regex = new RegExp(/(<a?)?:\w+:(\d{18}>)?/g);
      let emojie;
      if (regex.test(item.emoji)) {
        const e = Util.parseEmoji(item.emoji);
        emojie = item.emoji.replace(/(<a?)?:\w+:(\d{18}>)?/g, e.id);
      } else {
        emojie = item.emoji;
      }
      const role = item.role_id;
      const emoji = emojie;
      roles.push({ color: "blurple", label: label, emoji: emoji, role: role });
    }
    const buttons = [];
    const rows = [];
    for (const buttonObject of roles) {
      buttons.push(
        new MessageButton()
          .setStyle(buttonObject.color)
          .setEmoji(buttonObject.emoji)
          .setLabel(buttonObject.label)
          .setCustomID(`br:${buttonObject.role}`)
      );
    }
    for (let i = 0; i < Math.ceil(roles.length / 5); i++) {
      rows.push(new MessageActionRow());
    }
    rows.forEach((row, i) => {
      row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
    });
    const meeee = await message.channel.send({
      content: await client.lang.get(channel.guild, "BUTTON_ROLES/REMOVE_WAIT"),
    });
    let rolearr = [];
    let emojiarr = [];
    for (let i = 0; i < roles.length; i++) {
      rolearr.push(roles[i].role);
      emojiarr.push(roles[i].emoji);
    }
    setTimeout(async () => {
      const roless = rolearr;
      const emojis = emojiarr;
      const newEmbed = new AndoiEmbed(client.user)
        .setTitle(await client.lang.get(channel.guild, "BUTTON_ROLES/BTN"))
        .setDescription(createDescription(roless, emojis));
      const me = await msg.edit({ embeds: [newEmbed], components: rows });
      await m.save();
      meeee.edit({
        content: await client.lang.get(channel.guild, "BUTTON_ROLES/ADD_GOOD"),
      });
    }, 5000);
  }
  /**
   *
   * @param {Client} client
   * @param {String} messageID
   * @param {String} roleID
   */
  static async remove({ client, messageID, roleID, message }) {
    const m = await model.findOne({ messageID });
    if (!m) throw new Error("messageID was not provided");
    if (!roleID) throw new Error("roleID was not provided");
    const channel = client.channels.cache.get(m.channelID);
    if (!channel) throw new Error("channel not found.");
    const msg = await channel.messages.fetch(messageID);
    if (!msg) throw new Error("message not found.");
    const roles = m.roles;
    const newRoles = roles.filter((r) => r.role !== roleID);
    const buttons = [];
    const rows = [];
    for (const buttonObject of newRoles) {
      buttons.push(
        new MessageButton()
          .setStyle(buttonObject.color)
          .setEmoji(buttonObject.emoji)
          .setLabel(buttonObject.label)
          .setCustomID(`br:${buttonObject.role}`)
      );
    }
    for (let i = 0; i < Math.ceil(newRoles.length / 5); i++) {
      rows.push(new MessageActionRow());
    }
    rows.forEach((row, i) => {
      row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
    });
    const meeee = await message.channel.send({
      content: await client.lang.get(channel.guild, "BUTTON_ROLES/REMOVE_WAIT"),
    });
    let rolearr = [];
    let emojiarr = [];
    for (let i = 0; i < newRoles.length; i++) {
      rolearr.push(newRoles[i].role);
      emojiarr.push(newRoles[i].emoji);
    }
    setTimeout(async () => {
      const roless = rolearr;
      const emojis = emojiarr;
      const newEmbed = new AndoiEmbed(client.user)
        .setTitle(await client.lang.get(channel.guild, "BUTTON_ROLES/BTN"))
        .setDescription(createDescription(roless, emojis));
      const me = await msg.edit({ embeds: [newEmbed], components: rows });
      await m.updateOne({
        roles: newRoles,
        messageID: me.id,
      });
      meeee.edit({
        content: await client.lang.get(
          channel.guild,
          "BUTTON_ROLES/REMOVE_GOOD"
        ),
      });
    }, 5000);
  }
  /**
   * @param {Message} message - The Discord Message
   * @param {MessageEmbed} embed - The Discord Embed
   * @param {buttonroles} role - The created object using .buttonroles().addrole()
   * @param {String} channelID - the id of the channel you want to send the message to.
   */
  static async create({ message, content, role, channelID }) {
    if (message instanceof Message == false)
      throw new TypeError("please provide the Discord Message");
    if (!content) throw new Error("please provide content!");
    if (!role) throw new Error("role not provided!");
    if (!channelID) throw new Error("channelID not provided!");
    const buttons = [];
    const rows = [];
    for (const buttonObject of role.roles) {
      buttons.push(
        new MessageButton()
          .setStyle(buttonObject.color)
          .setEmoji(buttonObject.emoji)
          .setLabel(buttonObject.label)
          .setCustomID(`br:${buttonObject.role}`)
      );
    }
    for (let i = 0; i < Math.ceil(role.roles.length / 5); i++) {
      rows.push(new MessageActionRow());
    }
    rows.forEach((row, i) => {
      row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
    });
    const msg =
      content instanceof MessageEmbed
        ? await message.client.channels.cache
            .get(channelID)
            .send({ embeds: [content], components: rows })
        : await message.client.channels.cache
            .get(channelID)
            .send({ content: content, components: rows });
    new model({
      messageID: msg.id,
      roles: role.roles,
      content,
      channelID,
    }).save();
  }
  static async buttonclick(client, button) {
    if (!client) throw new Error("client not provided in buttonclick!");
    if (!button) throw new Error("Button not provided!");
    const id = button.customId;
    if (id.startsWith("br")) {
      let member;
      const fetchMem = await button.guild.members.fetch(
        button.member.id,
        false
      );
      if (fetchMem) member = button.guild.members.cache.get(button.member.id);
      await member.fetch(true);
      const role = id.split(":")[1];
      if (button.member.roles.cache.has(role)) {
        button.member.roles.remove(role);
        button.reply({
          content: await client.lang.get(
            button.guild,
            "BUTTON_ROLES/REMOVED_ROLE",
            role
          ),
          ephemeral: true,
        });
        return true;
      } else {
        button.member.roles.add(role);
        button.reply({
          content: await client.lang.get(
            button.guild,
            "BUTTON_ROLES/ADDED_ROLE",
            role
          ),
          ephemeral: true,
        });
        return true;
      }
    } else {
      return false;
    }
  }
}

module.exports = buttonroles;
function createDescription(roles, emojis) {
  const strings = [];

  for (let i = 0; i < roles.length; i++) {
    let emoji;
    if (parseInt(emojis[i])) {
      const emo = Util.parseEmoji(emojis[i]);
      emoji = `<:${emo.name}:${emo.id}>`;
    } else {
      emoji = emojis[i];
    }
    strings.push(`${emoji}: <@&${roles[i]}>`);
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
function parseEmojis(msg) {
  let content = msg.trim().split(/ + /g);

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
