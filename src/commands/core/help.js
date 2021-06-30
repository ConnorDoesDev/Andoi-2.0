const Command = require("../../struct/Command");
const { Message } = require("discord.js");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class HelpCommand extends Command {
  constructor(...args) {
    super(...args, {
      desc: "Get all the available commands.",
      usage: "[command]",
      example: ["ping"],
    });
  }
  /**
   * @param {Message} message
   */
  async run(message, [command]) {
    const prefix = await this.client.getPrefix(message);
    const embed = new AndoiEmbed()
      .setColor(this.client.settings.embed_main)
      .setAuthor(
        `${message.guild.name} Help`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();

    if (command) {
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

      if (!cmd)
        return message.channel.send({
          content: await this.client.lang.get(
            message.guild,
            "CORE/INVALID_COMMAND"
          ),
        });

      embed.setAuthor(
        await this.client.lang.get(message.guild, "CORE/OPTIONAL_HELP"),
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTitle(
        `\`${prefix}${cmd.name} ${cmd.usage.length ? cmd.usage : ""}\``
      );
      embed.addField(
        await this.client.lang.get(message.guild, "CORE/DESC"),
        cmd.desc
      );
      embed.addField(
        await this.client.lang.get(message.guild, "CORE/ALIAS"),
        cmd.aliases.length
          ? cmd.aliases.map((cmd) => `\`${cmd}\``).join(" ")
          : await this.client.lang.get(message.guild, "CORE/NO_ALIAS")
      );
      embed.addField(
        await this.client.lang.get(message.guild, "CORE/USAGE"),
        cmd.usage.length
          ? "`" + prefix + cmd.name + cmd.usage + "`"
          : await this.client.lang.get(message.guild, "CORE/NO_USAGE")
      );
      embed.addField(
        await this.client.lang.get(message.guild, "CORE/EXAMPLE"),
        cmd.example.length
          ? cmd.example.map((m) => `\`${prefix}${cmd.name} ${m}\``)
          : await this.client.lang.get(message.guild, "CORE/NO_EXAMPLE")
      );

      return message.channel.send({ embeds: [embed] });
    } else {
      embed.setDescription(
        await this.client.lang.get(message.guild, "CORE/MORE_CMD_INFO", prefix)
      );

      let categories;
      if (!this.client.isOwner(message.author.id)) {
        categories = this.client.utils.removeDupes(
          this.client.commands
            .filter((cmd) => cmd.category !== "Owner")
            .map((cmd) => cmd.category)
        );
      } else {
        categories = this.client.utils.removeDupes(
          this.client.commands.map((cmd) => cmd.category)
        );
      }

      for (const category of categories) {
        embed.addField(
          `**${this.client.utils.capitalise(category)}**`,
          this.client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
            .join(" ")
        );
      }
    }
    return message.channel.send({ embeds: [embed] });
  }
};
