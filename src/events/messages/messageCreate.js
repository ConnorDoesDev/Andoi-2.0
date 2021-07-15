const Event = require("../../struct/Event");
const { Collection } = require("discord.js");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const fetch = require("node-fetch");
module.exports = class MessageEvent extends Event {
  constructor(...args) {
    super(...args, {
      name: "messageCreate",
    });
  }
  async run(message) {
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;
    if (await this.chatbot(message)) return;
    const mentionRegex = new RegExp(`^<@!?${this.client.user.id}>$`);
    const mentionRegexPrefix = new RegExp(`^<@!?${this.client.user.id}> `);
    let dataPrefix = await this.client.getPrefix(message);
    if (message.content.match(mentionRegex))
      return message.channel.send({
        content: `My current prefix is \`${dataPrefix}\``,
      });

    const prefix = message.content.match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : dataPrefix;

    if (!message.content.startsWith(prefix)) return;

    const [commandName, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command =
      this.client.commands.get(commandName) ||
      this.client.commands.get(this.client.aliases.get(commandName));

    if (command) {
      if (command.ownerOnly && !this.client.isOwner(message.author.id)) {
        return;
      }

      if (command.guildOnly && !message.guild) {
        return message.reply({
          content: `${this.client.settings.emotes.warning} This command can only be run in a server.`,
        });
      }

      if (message.guild) {
        if (command.nsfw && !message.channel.nsfw) {
          return message.channel.send({
            content: `${this.client.settings.emotes.warning} This command can only be run in a nsfw channel.`,
          });
        }

        if (command.voice && !message.member.voice.channel) {
          return message.channel.send({
            content: `${this.client.settings.emotes.warning} You must be in a voice channel to use this command.`,
          });
        }
        const guildConfig = await this.client.getConfig(message.guild);
        if (command.premium && !guildConfig?.premium?.enabled) {
          return message.channel.send({
            content: `${this.client.emotes.error} This command is premium only!`,
          });
        }
        if (
          command.sameVoice &&
          message.member.voice.channel.id !== message.guild.me.voice.channel.id
        ) {
          return message.channel.send({
            content: `${this.client.settings.emotes.warning} You need to be in the same voice channel as mine to use this command.`,
          });
        }
        const userPermCheck = command.userPerms
          ? this.client.defaultPerms.add(command.userPerms)
          : this.client.defaultPerms;
        if (userPermCheck) {
          const missing = message.channel
            .permissionsFor(message.member)
            .missing(userPermCheck);
          if (missing.length && !this.client.isOwner(message.author.id)) {
            return message.reply({
              content: `You are missing \`${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )}\` permissions, you need them to use this command!`,
            });
          }
        }
        const botPermCheck = command.botPerms
          ? this.client.defaultPerms.add(command.botPerms)
          : this.client.defaultPerms;
        if (botPermCheck) {
          const missing = message.channel
            .permissionsFor(this.client.user)
            .missing(botPermCheck);
          if (missing.length) {
            return message.reply({
              content: `I am missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, I need them to run this command!`,
            });
          }
        }
      }
      if (command.args.length > args.length || (command.args && !args.length)) {
        const ee = command.args;
        const ex = `${prefix}${command.name} ${ee
          .map((e) => `<${e}>`)
          .join(", ")}`;
        const embed = new AndoiEmbed(message.author)
          .setTitle("Incorrect usage!")
          .setColor("RED")
          .setDescription(
            `${
              this.client.emotes.error
            } Missing arguments: \`${command.args.join("`, `")}\``
          )
          .addField("Example: ", ex);

        return message.channel.send({ embeds: [embed] });
      }
      if (!this.client.cooldowns.has(command.name)) {
        this.client.cooldowns.set(command.name, new Collection());
      }

      if (!this.client.isOwner(message.author.id)) {
        const now = Date.now();
        const timestamps = this.client.cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;
        if (timestamps.has(message.author.id)) {
          const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
            return message.channel.send({
              content: `Please wait ${timeLeft} more second(s) before reusing the \`${command.name}\` command.`,
            });
          }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
      if (command.playing && !this.client.player.getQueue(message)) {
        return message.channel.send({
          content: "There is nothing playing.",
        });
      }

      try {
        await command.run(message, args);
      } catch (err) {
        this.client.log.error(`${command.name}`, err.stack);
        return message.channel.send({
          content: `> ${this.client.emotes.warn} There was an error while executing this command: \`${err.message}\``,
        });
      }
    }
  }
  async chatbot(message) {
    const guildConfig = await this.client.getConfig(message.guild);
    if (!guildConfig?.chatbot) return;
    if (message.channel.id === guildConfig?.chatbot) {
      const data = await fetch(
        `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
          message.content
        )}&botname=${encodeURIComponent(
          "Andoi"
        )}&ownername=${encodeURIComponent("Tovade")}&user=${encodeURIComponent(
          message.author.id
        )}`
      ).then((res) => res.json());
      message.channel.send({ content: data.message });
      return true;
    } else {
      return false;
    }
  }
};
