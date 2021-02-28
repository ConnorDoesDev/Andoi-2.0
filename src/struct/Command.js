const { Permissions } = require("discord.js");
const path = require("path");
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
  }

  async run(message, args) {
    return this.client.log.error(
      "command",
      `Command ${this.name} doesn't have a default run method.`
    );
  }
};
