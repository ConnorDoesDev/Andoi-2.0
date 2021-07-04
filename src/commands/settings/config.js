const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const { valid, config } = require("../../assets/js/config");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "config",
      desc: "test a member",
      category: "config",
      guildOnly: true,
      ownerOnly: false,
      userPerms: ["ADMINISTRATOR"],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
      aliases: ["settings"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const type = args[0];
    const toChange = args[1];
    if (!type) {
      const embed = new AndoiEmbed(message.author)
        .setTitle(
          await this.lang.get(message.guild, "SETTINGS/TITLE", message.guild)
        )
        .setDescription(await this.lang.get(message.guild, "SETTINGS/INFO"))
        .addField(
          await this.lang.get(message.guild, "SETTINGS/PREFIX"),
          await message.guild.get("prefix", "a.")
        );
      message.channel.send({ embeds: [embed] });
    }
    if (type && !["set", "reset"].includes(type)) {
      return message.channel.send({
        content: await this.lang.get(message.guild, "SETTINGS/INVALID", [
          "set",
          "reset",
        ]),
      });
    }
    if (type && !toChange) {
      return message.channel.send({
        content: await this.lang.get(
          message.guild,
          "SETTINGS/NO_CHANGE",
          valid
        ),
      });
    }
    if (toChange && !valid.includes(toChange))
      return message.channel.send({
        content: await this.lang.get(
          message.guild,
          "SETTINGS/INVALID_CHANGE",
          valid
        ),
      });
    const newArgs = args.filter((arg) => arg !== type && arg !== toChange);
    switch (type) {
      case "set":
        await config[toChange].set(this.client, message, newArgs);
        break;
      case "reset":
        await config[toChange].reset(this.client, message, newArgs);
        break;
    }
  }
};
