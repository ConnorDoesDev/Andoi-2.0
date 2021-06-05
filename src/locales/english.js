module.exports = {
  CORE: {
    OPTIONAL_HELP:
      "Everything in <> is a required parameter, [] is a optional parameter",
    INVALID_COMMAND: "Invalid command.",
    NO_ALIAS: "There is no alias for this command.",
    DESC: "Description: ",
    ALIAS: "Aliases: ",
    USAGE: "Usage: ",
    NO_USAGE: "There is no usage for this command.",
    EXAMPLE: "Example: ",
    NO_EXAMPLE: "There are no examples for this command.",
    MORE_CMD_INFO: (prefix) =>
      `For additional info about a command use \`${prefix}help [command]\``,
    API_LATENCY: "Api latency: ",
    MESSAGE_LATENCY: "Message latency: ",
    DABABASE_LATENCY: "Database latency: ",
  },
  UTILITY: {
    VS_MARKET: "Visual Studio Code MarketPlace",
    MADE_BY: "Made by",
    LAST_UPDATE: "Last Update",
    LICENSE: "License",
    CHANGELOG: "Changelog",
    INSTALL: "Install",
    INSTALLS: "Installs",
  },
};
