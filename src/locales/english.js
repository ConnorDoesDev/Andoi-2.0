const ms = require("ms");
module.exports = {
  ERROR: "An error has occured please contact the developer!",
  CORE: {
    DAY: "day",
    DAYS: "days",
    HOUR: "Hour",
    HOURS: "Hours",
    SERVERS: "Servers",
    COMMANDS: "Commands",
    EVENTS: "Events",
    USERS: "Users",
    CHANNELS: "Channels",
    CLIENT: "Client",
    SERVER: "Server",
    PING: "Ping",
    UPTIME: "Uptime",
    OS: "Os",
    CPU: "CPU",
    CORES: "Cores",
    CPU_USAGE: "CPU usage",
    RAM: "Ram",
    RAM_USAGE: "Ram Usage",
    ANDOI_STATS: "Andoi's Statistics",
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
    DATABASE_LATENCY: "Database latency: ",
    HAS_PREMIUM: "This server already has premium enabled.",
    INVALID_PREMIUM: "The code that was provided is invalid.",
    REDEEMED_SUCCESSFULLY: ({ id, guildname, expires }) =>
      `Congrats! This server (${guildname}) is now a premium server! The reciept ID is ${id}. The premium plan expires at: ${expires}`,
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
  FUN: {
    MC_ACHIEVEMENT: "Minecraft achievement",
    SOLVE_CAPTCHA: "Solve the captcha!",
  },
  GIVEAWAY: {
    WHAT_PRIZE: "What is the prize?",
    WHAT_CHANNEL: (prize) =>
      `The prize is **${prize}**! What channel do you want to host the giveaway in`,
    HOW_WINNERS: (id) =>
      `Channel is <#${id}>! Now how many winners do you want?`,
    LESS_WINNERS: "You cannot have more then 10 winners.",
    WHAT_TIME: (winners) =>
      `${winners} winner(s) will be chosen for this giveaway! How much time do you want?`,
    WHAT_HOST: (time) =>
      `The time is now set to ${time}! Who is hosting the giveaway?`,
    WHAT_REQ: (host) =>
      `The host is ${host.user.username}! Now do you want any requirements for the giveaway?`,
    IS_CORRECT: ({ giveaway, message }) =>
      `Is this correct?\n\`\`\`Prize: ${giveaway.prize}\nWinner(s): ${
        giveaway.winners
      }\nTime: ${ms(giveaway.time)}\nhost: ${
        message.guild.members.cache.get(giveaway.host).user.username
      }\nRequirements: ${
        giveaway.reqEnabled ? "Yes" : "No"
      }\n\`\`\`Reply with \`yes\` or \`no\`!`,
    NOT_TIME: "You did not respond in time.",
    ERROR: "You did not provide valid option!",
    WRONG_INFO: "Cancelled giveaway setup due to wrong info!",
    HIGH_TIME: "The time cannot be more than 14 days!",
    ROLE_REQ:
      "You can use role requirements by providing the id. Example: 853232801398128640",
    INVALID_ROLE: "That is not a valid role!",
    IS_REQ_CORRECT: ({ giveaway, message }) =>
      `Added the role to requirements!\n\`\`\`\n${
        message.guild.roles.cache.get(giveaway.requirements.role).name
      }\n\`\`\``,
    CREAT_GIV: "Created the giveaway!",
    PROVIDE_ID: "You have to specify a valid message ID!",
    UNABLE_FIND: (args) =>
      "Unable to find a giveaway for `" + args.join(" ") + "`.",
    WILL_END: (client) =>
      "Giveaway will end in less than " +
      client.giveaway.options.updateCountdownEvery / 1000 +
      " seconds...",
    ALREADY_END: "This giveaway is already ended!",
    REROLL: "The giveaway has been re-rolled",
    NOT_END: "The giveaway hasn't ended yet!",
  },
  GWMSG: {
    GIVEAWAY_START:
      "<:bgift:851096270038761482> **GIVEAWAY** <:bgift:851096270038761482>",
    GIVEAWAY_END:
      "<:bgift:851096270038761482> **GIVEAWAY** <:bgift:851096270038761482>",
    TIME: "Time remaining: **{duration}**!",
    REACT: "React with 🎉 to participate!",
    WIN: "Congratulations, {winners}! You won **{prize}**!",
    NO_WINNER: "Giveaway cancelled, no valid participations.",
    HOST: "Hosted by: {user}",
    WINNER: "winner(s)",
    END_AT: "Ended at",
    SECOND: "seconds",
    MINUTE: "Minutes",
    HOUR: "Hours",
    DAY: "Days",
    ROLE_REQ: "Role requirements:",
  },
};
