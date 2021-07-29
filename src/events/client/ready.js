const Event = require("../../struct/Event");
const Guild = require("../../models/guild");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class ReadyEvent extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
      name: "ready",
    });
  }

  async run() {
    try {
      this.client.log.info("client", `Logged in as ${this.client.user.tag}`);
      this.client.log.info(
        "command",
        `Loaded ${this.client.commands.size} commands`
      );
      this.client.log.info("event", `Loaded ${this.client.events.size} events`);
      this.startPresence();
      this.client.log.info("status", "Started presence");
      this.sendMessage();
      this.client.log.info("startMessage", "Sended message");
      this.checkPrem;

      await this.client.utils.handleInteractions();
    } catch (err) {
      console.log(err.stack);
    }
  }
  async checkPrem() {
    setInterval(async () => {
      const conditional = {
        premium: {
          enabled: true,
        },
      };
      const results = await Guild.find(conditional);

      if (results && results.length) {
        for (const result of results) {
          if (
            Number(result.premium.redeemedAt) >=
            Number(result.premium.expiresAt)
          ) {
            const guildPremium = this.client.guilds.cache.get(result.guild);
            if (guildPremium) {
              const user = await this.client.users.cache.get(
                result.premium.redeemedBy
              );

              if (user) {
                const embed = new AndoiEmbed()
                  .setWarning()
                  .setDescription(
                    await this.client.lang.get(
                      guildPremium,
                      "CORE/PREM_EXPIRE",
                      { user, guildPremium }
                    )
                  );

                user.send({ embeds: [embed] }).catch(() => {});
              }

              result.premium.enabled = false;
              result.premium.redeemedBy = null;
              result.premium.redeemedAt = null;
              result.premium.expiresAt = null;
              result.premium.plan = null;

              await result.save().catch(() => {});
            }
          }
        }
      }
    }, 500000);
  }
  async sendMessage() {
    if (process.env.dev === "false") {
      const channel = this.client.channels.cache.get(
        this.client.settings.channels.ready
      );
      const servers = this.client.utils.formatNumber(
        this.client.guilds.cache.size
      );
      const members = this.client.utils.formatNumber(
        this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
      );
      const commands = this.client.commands.size;
      const boot = this.client.bootTime;
      const embed = {
        title: `\`[ ${this.client.pack.version} ]\` **REBOOT**`,
        color: "GREY",
        description: [
          "```properties",
          `Servers: ${servers}`,
          `Members: ${members}`,
          `Commands: ${commands}`,
          `Boot: ${boot}ms`,
          "```",
        ].join("\n"),
      };

      await channel
        ?.send({ embeds: [embed] })
        .then((msg) => msg.crosspost())
        .catch(() => {});
    }
  }
  startPresence() {
    let i = 0;
    const members = this.client.utils.formatNumber(
      this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
    );
    const servers = this.client.utils.formatNumber(
      this.client.guilds.cache.size
    );
    const commands = this.client.utils.formatNumber(this.client.commands.size);
    const channels = this.client.utils.formatNumber(
      this.client.channels.cache.size
    );
    this.client.user.setActivity(`a!help | v${this.client.pack.version}`, {
      type: "WATCHING",
    });
    setInterval(() => {
      const textArray = [
        `a!help | ${servers} servers`,
        `a!help | ${members} users`,
        `a!help | ${commands} commands`,
        `a!help | ${channels} channels`,
        `a!help | v${this.client.pack.version}`,
        "With people",
        "a!help | github.com/Andoi-official/Andoi-2.0",
      ];
      const activityArray = [
        "WATCHING",
        "WATCHING",
        "WATCHING",
        "WATCHING",
        "WATCHING",
        "PLAYING",
      ];

      this.client.user.setActivity(textArray[i], { type: activityArray[i] });

      i++;

      if (i == 3) i = 0;
    }, 60000);
  }
};
