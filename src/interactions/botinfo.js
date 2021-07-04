const InteractionClass = require("../struct/Interaction");
const { Interaction, version } = require("discord.js");
const choices = [
  {
    name: "Guild count",
    value: "guild-count",
    return: (client, lang) =>
      `${client.utils.formatNumber(client.guilds.cache.size)} ${
        lang.CORE.SERVERS
      }`,
  },
  {
    name: "User count",
    value: "user-count",
    return: (client, lang) => {
      const userCount = client.utils.formatNumber(
        client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
      );
      return `${userCount} ${lang.CORE.USERS}`;
    },
  },
  {
    name: "Command count",
    value: "command-count",
    return: (client, lang) => {
      return `${client.utils.formatNumber(client.commands.size)} ${
        lang.CORE.COMMANDS
      }`;
    },
  },
  {
    name: "Memory usage",
    value: "memory",
    return: (client, lang) => {
      return `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB ${
        lang.CORE.RAM_USAGE
      }`;
    },
  },
  {
    name: "Nodejs version",
    value: "node",
    return: (client, lang) => {
      return process.version;
    },
  },
  {
    name: "Discord.js version",
    value: "djs",
    return: (client, lang) => {
      return version;
    },
  },
];
module.exports = class BotInteraction extends InteractionClass {
  constructor(...args) {
    super(...args, {
      name: "botinfo",
      description: "Check my info!",
      options: [
        {
          name: "option",
          type: "STRING",
          description: "Returns a peace of information about the bot.",
          required: true,
          choices: choices.map((choice) => ({
            value: choice.value,
            name: choice.name,
          })),
        },
      ],
    });
  }
  /**
   * @param {Interaction} interaction
   */
  async run(interaction, args) {
    const lang = await this.lang.getFile(interaction.guild);
    const choice = choices.find((ch) => ch.value === args[0]);
    return interaction.reply({ content: choice.return(this.client, lang) });
  }
};
