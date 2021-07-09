const {
  Permissions,
  Message,
  GuildMember,
  TextChannel,
  Role,
} = require("discord.js");
const path = require("path");
const langManager = require("./LanguageManager");
module.exports = class Command {
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.desc = options.desc || "There is no description for this command.";
    this.usage = options.usage || "";
    this.example = options.example || [];
    this.category = options.category || "core";
    this.cooldown = Number(options.cooldown) || 3;
    this.nsfw = Boolean(options.nsfw);
    this.ownerOnly = Boolean(options.ownerOnly) || false;
    this.guildOnly = Boolean(options.guildOnly) || true;
    this.userPerms = new Permissions(options.userPerms).freeze();
    this.botPerms = new Permissions(options.botPerms).freeze();
    this.args = options.args || false;
    this.voice = Boolean(options.voice) || false;
    this.sameVoice = Boolean(options.sameVoice) || false;
    this.premium = Boolean(options.premium) || false;
    this.playing = Boolean(options.playing) || false;
    this.lang = new langManager(this.client);
    this.options = options;
  }

  async run(message, args) {
    return this.client.log.error(
      "command",
      `Command ${this.name} doesn't have a default run method.`
    );
  }
  /**
   *
   * @param {Message} message
   * @param {Array} args
   * @param {Boolean} allowAuthor
   * @returns {GuildMember} GuildMember
   */
  findMember(message, args, allowAuthor = false) {
    let member;

    member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((m) => m.user.id === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      message.guild.members.cache.find((m) => m.user.username === args[0]);

    if (!member && allowAuthor) {
      member = message.member;
    }

    return member;
  }
  /**
   *
   * @param {Message} message
   * @param {Array} args
   * @param {Boolean} allowauthor
   * @returns {TextChannel} channel
   */
  findChannel(message, args, allowauthor = false) {
    let channel;

    channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((r) => r.name === args[0]) ||
      message.guild.channels.cache.find((r) => r.name.startsWith(args[0]));

    if (!channel && allowauthor) {
      channel = message.channel;
    }
    return channel;
  }
  /**
   *
   * @param {Message} message
   * @param {Array} args
   * @param {Boolean} allowChannel
   * @returns {Role} role
   */
  findRole(message, args, allowChannel = false) {
    let role;
    role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find((r) => r.name === args[0]) ||
      message.guild.roles.cache.find((r) => r.name.startsWith(args[0]));
    if (!role && allowChannel) {
      role = message.member.roles.highest;
    }
    return role;
  }
};
