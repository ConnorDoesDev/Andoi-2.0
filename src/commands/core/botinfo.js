const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const moment = require("moment");
const { mem, cpu, os } = require("node-os-utils");
const { stripIndent } = require("common-tags");
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "botinfo",
      desc: "Get detailed stats about the bot.",
      category: "core",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    message.channel.startTyping();
    const d = moment.duration(this.client.uptime);
    const days =
      d.days() == 1
        ? `${d.days()} ${await this.lang.get(message.guild, "CORE/DAY")}`
        : `${d.days()} ${await this.lang.get(message.guild, "CORE/DAYS")}`;
    const hours =
      d.hours() == 1
        ? `${d.hours()} ${await this.lang.get(message.guild, "CORE/HOUR")}`
        : `${d.hours()} ${await this.lang.get(message.guild, "CORE/HOURS")}`;
    const clientStats = stripIndent`
    ${await this.lang.get(message.guild, "CORE/SERVERS")}   :: ${
      this.client.guilds.cache.size
    }
    ${await this.lang.get(message.guild, "CORE/USERS")}     :: ${
      this.client.users.cache.size
    }
    ${await this.lang.get(message.guild, "CORE/CHANNELS")}  :: ${
      this.client.channels.cache.size
    }
    ${await this.lang.get(message.guild, "CORE/PING")}      :: ${Math.round(
      this.client.ws.ping
    )}ms
    ${await this.lang.get(
      message.guild,
      "CORE/UPTIME"
    )}    :: ${days} and ${hours}
    ${await this.lang.get(message.guild, "CORE/COMMANDS")}  :: ${
      this.client.commands.size
    }
    ${await this.lang.get(message.guild, "CORE/EVENTS")}    :: ${
      this.client.events.size
    } 
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
    ${await this.lang.get(message.guild, "CORE/OS")}        :: ${await os.oos()}
    ${await this.lang.get(message.guild, "CORE/CPU")}       :: ${cpu.model()}
    ${await this.lang.get(message.guild, "CORE/CORES")}     :: ${cpu.count()}
    ${await this.lang.get(
      message.guild,
      "CORE/CPU_USAGE"
    )} :: ${await cpu.usage()} %
    ${await this.lang.get(message.guild, "CORE/RAM")}       :: ${totalMemMb} MB
    ${await this.lang.get(message.guild, "CORE/RAM_USAGE")} :: ${usedMemMb} MB 
    `;

    const embed = new AndoiEmbed(message.author)
      .setTitle(await this.lang.get(message.guild, "CORE/ANDOI_STATS"))
      .addField(
        await this.lang.get(message.guild, "CORE/CLIENT"),
        `\`\`\`asciidoc\n${clientStats}\`\`\``
      )
      .addField(
        await this.lang.get(message.guild, "CORE/SERVER"),
        `\`\`\`asciidoc\n${serverStats}\`\`\``
      )
      .setTimestamp()
      .setImage("https://share.creavite.co/xlDP4VYcm1hSpUnu.gif")
      .setColor("BLUE");
    message.channel.send({ embeds: [embed] });
    message.channel.stopTyping();
  }
};
