const ms = require("ms");
module.exports = {
  ERROR: "An error has occured please contact the developer!",
  APP: {
    MAX_QUESTIONS: (maxQuestions) =>
      `You can only add ${maxQuestions} question's!`,
    SUCCESS_ADD: "Added those question successfully",
    INVALID_OPTION:
      "Invalid option! Available options: `logs, enable, disable, acceptedrole`.",
    CHANNEL_SELECT:
      "What is the channel gonna be? example: [channel mention] [channel name] [channel id]",
    CHANNEL_NOW: (finalChan) =>
      `The application logs are now ${finalChan} (${finalChan.name})`,
    INVALID_CHANNEL: "Invalid channel! Cancelling....",
    ENABLE: `The application system is now enabled.`,
    DISABLE: `The application system is now disabled.`,
    ROLE_SELECT:
      "What is the role gonna be? example: [role mention] [role name] [role id]",
    INVALID_ROLE: "Invalid role! Cancelling....",
    ROLE_NOW: (finalChan1) =>
      `The application approved role is now ${finalChan1.name} (${finalChan1.id})`,
    NO_QUEST: `The current server does not have any questions to apply to.`,
    NO_APPLY_CONF: `I could not find the guild's apply Log channel. Please make sure to let an admin know.`,
    PRIVACY_DM:
      "Your application will go through in your dms due to privacy reasons.",
    COULD_NOT_DM: (message) =>
      `Couldn't send you the questions, your dms are closed - ${message.author}`,
    INTERVIEW_CANCEL: "Interview has been cancelled.",
    PENDING: "Your application is now pending!",
    APPROVE_DENY: (db) =>
      `Approve or decline by doing \`a!approve ${db.appID}\` or \`a!decline ${db.appID}\``,
    APPLICATION: "application",
    NO_ID_PROVIDE:
      "No application id was provided. How to get one? Use the command `a!review` to find the application ID.",
    NOT_FIND_ID: "Could not find this application.",
    ALREADY_APPROVE: "This application was already approved",
    ALREADY_DENY: "This application was already denied",
    PROVIDE_NUM: "Provide the number of the question to remove",
    NO_QUESTIONS: "There are no questions",
    QUESTION_NOT_EXIST: "That question does not exist!",
    REM_QUESTIONS_DB: "Succesfully removed a question from the database.",
    NO_APPS: "No Pending Applications Found",
    SUBMITTER: "Submitter",
    APP_REV: "Application review",
    QUESTIONS: "**Questions**",
    APPROVED: (id, message, reason) =>
      `I have sucessfully approved this Application.\n\n**Application ID:** ${id}\n**Approved by:** ${message.author.tag}\n**Reason:** ${reason}`,
    APPROVED_DM: (id, message, reason, member) =>
      `Hey ${member.user.tag}, your form was Approved!\n\n**Application ID:** ${id}\n**Approved by:** ${message.author.tag}\n**Reason:** ${reason}`,
    NVM_DM: (member) =>
      `Never Mind... I was able to approve the Application but couldn't dm ${member.user.tag} since their DMs are closed.'`,
    DENIED: (id, message, reason) =>
      `I have sucessfully declined this application.\n\n**Application ID:** ${id}\n**Declined by:** ${message.author.tag}\n**Reason:** ${reason}`,
    NVM_DENY_DM: (member) =>
      `Never Mind... I was able to deny the Application but couldn't dm ${member.user.tag} since their DMs are closed.'`,
    DENY_DM: (id, message, reason, member) =>
      `Hey ${member.user.tag}, your application was Declined.\n\n**Application ID:** ${id}\n**Declined by:** ${message.author.tag}\n**Reason:** ${reason}`,
  },
  SETTINGS: {
    TITLE: (guild) => `${guild.name}'s settings`,
    PREFIX: "Prefix:",
    INVALID: (valid) => `Invalid type. Valid types: ${valid.join(", ")}`,
    NO_CHANGE: (vl) => `What do you want to change? ${vl.join(", ")}`,
    INFO: "These are the settings. **Tip:** to change something use this command with an `set` or `reset` argument after the command.",
    INVALID_CHANGE: (val) =>
      `Invalid setting to change. Valid changes: ${val.join(", ")}`,
    NO_PREFIX: "No prefix was provided.",
    INVALID_PREFIX: "Prefix is too long.",
    SUCCESS_PREFIX: "Successfully changed the prefix.",
    RESET_PREFIX: "The prefix has been reset.",
  },
  BUTTON_ROLES: {
    REMOVED_ROLE: (role) => `I have removed the <@&${role}> from you!`,
    ADDED_ROLE: (role) => `I have added the role <@&${role}> to you!`,
    REMOVE_WAIT: "Please wait 5 seconds...",
    REMOVE_GOOD: "Successfully removed the role from reaction roles.",
    ADD_GOOD: "Successfully added the button roles.",
    DELETE_GOOD: "Deleted the button roles.",
    PROVIDE_CHANNEL: "Please provide an channel.",
    PROVIDE_ROLE:
      "Please send your roles by id below, separate by space. E.G.: 389730847098379087 9876096987980987 7867869876689766",
    PROVIDE_EMOJI:
      "Please send your emojis below. The order will match with the order of the roles. Separate with a space",
    CHANNEL_NOT: "Channel was not found.",
    BTN: "Andoi Button Roles",
  },
  MUSIC: {
    PLAYING_NOW: (song) => `Now playing: ${song.name}`,
    ADDED_SONG: (song) => `Added ${song.name} to the queue.`,
    EMPTY_VC: "I left the voice channel as i was the only person in it.",
    AUTHOR: "Author:",
    VIEWS: "Views:",
    DURATION: "Duration:",
    REQUEST: "Requested By: ",
    RESULTS_QUERY: (message) => `Here are your search results for ${message}`,
    SEARCH_FOOTER: "Send the number of the song you want to play.",
    NO_RESULTS: (msg) => `No results for ${msg}`,
    CANCEL_SEARCH: "Cancelled searching.",
    LEFT_NO: "I have left the voice channel as there where no more songs.",
    ADD_LIST: (list) =>
      `Added \`${list.name}\` playlist (${list.songs.length} songs) to the queue.`,
    STOP: "I have stopped the music.",
    SHUFFLE: "Shuffled the songs!",
    SKIP: "Skipped the song!",
    PAUSE: "Paused the music!",
    RESUME: "Resumed the music!",
    NOT_PAUSED: "The queue is not paused.",
    ALREADY_PAUSED: "The queue is already paused.",
    INVALID: "You did not provide a number of a song",
    ENABLE_FILTER: (prefix) =>
      `List of all filters enabled or disabled.\nUse \`${prefix}filter\` to add a filter to a song.`,
    FILTER_NOT_EXIST:
      "This filter doesn't exist! Tip: use a!filters to view all the filters!",
    ADDING_FILTER:
      "I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.",
    DISABLING_FILTER:
      "I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.",
    QUEUE: (guild) => `Server queue - ${guild.name}`,
    CURRENT_PLAY: `Currently playing:`,
    QUEUE_DESC: (songs) =>
      `${songs
        .map(
          (track, i) => `**#${i + 1}** - ${track.name} | ${track.uploader.name}`
        )
        .slice(0, 5)
        .join("\n")}`,
    TO_LOUD: "The amount that is provided is to loud.",
    SUCCESS_VOLUME: (amount) => `Volume is now set to ${amount}%`,
  },
  CORE: {
    PREM_EXPIRE: ({ user, guildPremium }) =>
      `Hey ${user.username}, Premium in ${guildPremium.name} has Just expired.\n\nThank you for purchasing premium Previously! We hope you enjoyed what you purchased.`,
    DAY: "day",
    DAYS: "days",
    INVITE: "Invite",
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
    ANDOI_STATS: ({ pack }) => `Andoi v${pack.version}`,
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
  SEARCHER: {
    NO_SONG: "No song was found.",
    NO_SONG_PRO: "No song was provided.",
    FULL_LYRICS: "Full lyrics",
  },
  GAMES: {
    SNAKE: "Snake Game",
    END: "Game Over",
    SCORE: "Score: ",
  },
  UTILITY: {
    VS_MARKET: "Visual Studio Code MarketPlace",
    MADE_BY: "Made by",
    LAST_UPDATE: "Last Update",
    LICENSE: "License",
    CHANGELOG: "Changelog",
    INSTALL: "Install",
    INSTALLS: "Installs",
    INSTALL_WITH: "Install with",
  },
  FUN: {
    MC_ACHIEVEMENT: "Minecraft achievement",
    COINFLIP: ({ result, user }) => `${user.username} flipped ${result}`,
    SOLVE_CAPTCHA: "Solve the captcha!",
    WYR: "Would you rather.",
  },
  INTERACTIONS: {
    INVALID_STAGE: "That is not a voice channel.",
    SUCCESS_TOGETHER: (invite) => `Here is your [invite](${invite}).`,
    TOGETHER: "Discord Together",
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
    INCORRECT_ENTER: ({ role, link }) =>
      `Your entry for this [giveaway](${link}) has been denied you are missing the role \`${role.name}\``,
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
  BADGES: {
    NO_BADGES: "You dont have any badges!",
  },
};
