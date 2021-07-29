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
    const lang = await this.lang.getFile(message.guild);
    const d = moment.duration(this.client.uptime);
    const days =
      d.days() == 1
        ? `${d.days()} ${lang.CORE.DAY}`
        : `${d.days()} ${lang.CORE.DAYS}`;
    const hours =
      d.hours() == 1
        ? `${d.hours()} ${lang.CORE.HOUR}`
        : `${d.hours()} ${lang.CORE.HOURS}`;
    const clientStats = stripIndent`
    ${lang.CORE.SERVERS}   :: ${this.client.guilds.cache.size}
    ${lang.CORE.USERS}     :: ${this.client.users.cache.size}
    ${lang.CORE.CHANNELS}  :: ${this.client.channels.cache.size}
    ${await this.lang.get(message.guild, "CORE/PING")}      :: ${Math.round(
      this.client.ws.ping
    )}ms
    ${lang.CORE.UPTIME}    :: ${days} and ${hours}
    ${lang.CORE.COMMANDS}  :: ${this.client.commands.size}
    ${lang.CORE.EVENTS}    :: ${this.client.events.size} 
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
    ${lang.CORE.OS}        :: ${await os.oos()}
    ${lang.CORE.CPU}       :: ${cpu.model()}
    ${lang.CORE.CORES}     :: ${cpu.count()}
    ${lang.CORE.CPU_USAGE} :: ${await cpu.usage()} %
    ${lang.CORE.RAM}       :: ${totalMemMb} MB
    ${lang.CORE.RAM_USAGE} :: ${usedMemMb} MB 
    `;

    const embed = new AndoiEmbed(message.author)
      .setTitle(lang.CORE.ANDOI_STATS({ pack: this.client.pack }))
      .setURL(this.client.settings.links.github)
      .addField(lang.CORE.CLIENT, `\`\`\`asciidoc\n${clientStats}\`\`\``)
      .addField(
        await this.lang.get(message.guild, "CORE/SERVER"),
        `\`\`\`asciidoc\n${serverStats}\`\`\``
      )
      .addField(lang.CORE.INVITE, `[Andoi](${this.client.settings.links.bot})`)
      .setTimestamp()
      .setImage("https://share.creavite.co/xlDP4VYcm1hSpUnu.gif")
      .setColor("BLUE");
    message.channel.send({ embeds: [embed] });
    message.channel.stopTyping();
  }
};
