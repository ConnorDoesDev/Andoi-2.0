const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const giveaway = {
  prize: null,
  channel: null,
  winners: null,
  hostedBy: null,
  time: null,
  reqEnabled: false,
  requirements: {
    role: null,
  },
};
module.exports.start = async (client, message, args) => {
  const filter = (m) => m.author.id === message.author.id;
  const collector = message.channel.createMessageCollector(filter, {
    max: 7,
    time: 60 * 1000,
  });
  let step = 0;

  message.channel.send({
    content: await client.lang.get(message.guild, "GIVEAWAY/WHAT_PRIZE"),
  });
  collector.on("collect", async (msg) => {
    if (!msg.content) return collector.stop("error");

    step++;
    if (step == 1) {
      const prize = msg.content;
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/WHAT_CHANNEL",
          prize
        ),
      });
      giveaway.prize = prize;
    } else if (step == 2) {
      const channel =
        msg.mentions.channels.first() ||
        msg.guild.channels.cache.get(msg.content);
      if (!channel) return collector.stop("error");
      giveaway.channel = channel.id;
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/HOW_WINNERS",
          channel.id
        ),
      });
    } else if (step == 3) {
      const winners = msg.content;
      if (isNaN(winners)) return collector.stop("error");
      if (parseInt(winners) > 10) {
        message.reply({
          content: await client.lang.get(
            message.guild,
            "GIVEAWAY/LESS_WINNERS"
          ),
        });
        return collector.stop("error");
      }
      giveaway.winners = parseInt(winners);
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/WHAT_TIME",
          winners
        ),
      });
    } else if (step == 4) {
      const time = msg.content;
      if (!ms(time)) return collector.stop("error");
      giveaway.time = time;
      if (ms(giveaway.time) > ms("14d")) return collector.stop("HIGH_TIME");
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/WHAT_HOST",
          time
        ),
      });
    } else if (step == 5) {
      const host =
        msg.mentions.members.first() ||
        msg.guild.members.cache.get(msg.content) ||
        message.member;

      giveaway.host = host.id;
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/WHAT_REQ",
          host
        ),
      });
    } else if (step == 6) {
      if (!["yes", "no"].includes(msg.content.toLowerCase()))
        return collector.stop("error");
      giveaway.reqEnabled = true;
      return message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/IS_CORRECT", {
          giveaway,
          message,
        }),
      });
    } else if (step == 7) {
      if (!["yes", "no"].includes(msg.content.toLowerCase()))
        return collector.stop("error");
      if (msg.content.toLowerCase() == "yes") return collector.stop("done");
      if (msg.content.toLowerCase() == "no") return collector.stop("cancel");
    }
  });

  collector.on("end", async (msgs, reason) => {
    if (reason == "time")
      return message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/NOT_TIME"),
      });
    if (reason == "error")
      return message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/ERROR"),
      });
    if (reason == "cancel")
      return message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/WRONG_INFO"),
      });
    if (reason == "HIGH_TIME")
      return message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/HIGH_TIME"),
      });

    if (reason == "done" && giveaway.reqEnabled) {
      message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/ROLE_REQ"),
      });
      const rcollector = message.channel.createMessageCollector(filter, {
        time: 60 * 1000,
        max: 1000,
      });
      rcollector.on("collect", async (m) => {
        if (
          !["done", "stop", "cancel"].includes(m.content.toLowerCase()) &&
          !message.guild.roles.cache.get(m.content)
        )
          return rcollector.stop("error");

        if (!giveaway.requirements?.role) giveaway.requirements = { role: "" };
        const id = m.content;

        if (!message.guild.roles.cache.get(id))
          return message.channel.send({
            content: await client.lang.get(
              message.guild,
              "GIVEAWAY/INVALID_ROLE"
            ),
          });
        giveaway.requirements.role = m.content;
        message.channel.send({
          content: await client.lang.get(
            message.guild,
            "GIVEAWAY/IS_REQ_CORRECT",
            {
              giveaway,
              message,
            }
          ),
          allowedMentions: { roles: [], parse: [], users: [] },
        });
        return rcollector.stop("done");
      });

      rcollector.on("end", async (msg, r) => {
        if (r == "time")
          return message.channel.send({
            content: await client.lang.get(message.guild, "GIVEAWAY/NOT_TIME"),
          });
        if (r == "error")
          return message.channel.send({
            content: await client.lang.get(message.guild, "GIVEAWAY/ERROR"),
          });
        if (r == "cancel")
          return message.channel.send({
            content: await client.lang.get(
              message.guild,
              "GIVEAWAY/WRONG_INFO"
            ),
          });

        if (r == "done") {
          await client.giveaway.start(
            client.channels.cache.get(giveaway.channel),
            {
              // The giveaway duration
              time: ms(giveaway.time),
              // The giveaway prize
              prize: giveaway.prize,
              // The giveaway winner count
              winnerCount: giveaway.winners,
              hostedBy: giveaway.hostedBy,
              extraData: {
                role: giveaway.requirements.role,
              },

              messages: {
                giveaway: await client.lang.get(
                  message.guild,
                  "GWMSG/GIVEAWAY_START"
                ),
                giveawayEnded: await client.lang.get(
                  message.guild,
                  "GWMSG/GIVEAWAY_END"
                ),
                timeRemaining: await client.lang.get(
                  message.guild,
                  "GWMSG/TIME"
                ),
                inviteToParticipate: await client.lang.get(
                  message.guild,
                  "GWMSG/REACT"
                ),
                winMessage: await client.lang.get(message.guild, "GWMSG/WIN"),
                embedFooter: "Andoi ©",
                noWinner: await client.lang.get(
                  message.guild,
                  "GWMSG/NO_WINNER"
                ),
                hostedBy: await client.lang.get(message.guild, "GWMSG/HOST"),
                winners: await client.lang.get(message.guild, "GWMSG/WINNER"),
                endedAt: await client.lang.get(message.guild, "GWMSG/END_AT"),
                requirements: await client.lang.get(
                  message.guild,
                  "GWMSG/ROLE_REQ"
                ),
                units: {
                  seconds: await client.lang.get(message.guild, "GWMSG/SECOND"),
                  minutes: await client.lang.get(message.guild, "GWMSG/MINUTE"),
                  hours: await client.lang.get(message.guild, "GWMSG/HOUR"),
                  days: await client.lang.get(message.guild, "GWMSG/DAY"),
                  pluralS: false,
                },
              },
            }
          );
          await message.channel
            .send({
              content: await client.lang.get(
                message.guild,
                "GIVEAWAY/CREAT_GIV"
              ),
            })
            .then((m) => setTimeout(() => m.delete(), 2000));
        }
      });
    } else {
      await client.giveaway.start(client.channels.cache.get(giveaway.channel), {
        // The giveaway duration
        time: ms(giveaway.time),
        // The giveaway prize
        prize: giveaway.prize,
        // The giveaway winner count
        winnerCount: giveaway.winners,
        hostedBy: giveaway.hostedBy,

        messages: {
          giveaway: await client.lang.get(
            message.guild,
            "GWMSG/GIVEAWAY_START"
          ),
          giveawayEnded: await client.lang.get(
            message.guild,
            "GWMSG/GIVEAWAY_END"
          ),
          timeRemaining: await client.lang.get(message.guild, "GWMSG/TIME"),
          inviteToParticipate: await client.lang.get(
            message.guild,
            "GWMSG/REACT"
          ),
          winMessage: await client.lang.get(message.guild, "GWMSG/WIN"),
          embedFooter: "Andoi ©",
          noWinner: await client.lang.get(message.guild, "GWMSG/NO_WINNER"),
          hostedBy: await client.lang.get(message.guild, "GWMSG/HOST"),
          winners: await client.lang.get(message.guild, "GWMSG/WINNER"),
          endedAt: await client.lang.get(message.guild, "GWMSG/END_AT"),
          units: {
            seconds: await client.lang.get(message.guild, "GWMSG/SECOND"),
            minutes: await client.lang.get(message.guild, "GWMSG/MINUTE"),
            hours: await client.lang.get(message.guild, "GWMSG/HOUR"),
            days: await client.lang.get(message.guild, "GWMSG/DAY"),
            pluralS: false,
          },
        },
      });
      await message.channel
        .send({
          content: await client.lang.get(message.guild, "GIVEAWAY/CREAT_GIV"),
        })
        .then((m) => setTimeout(() => m.delete(), 2000));
    }
  });
};
module.exports.end = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send({
      content: await client.lang.get(message.guild, "GIVEAWAY/PROVIDE_ID"),
    });
  }

  let giveaway =
    client.giveaway.giveaways.find(
      (g) => g.prize === args.join(" ") && g.guildID === message.guild.id
    ) ||
    client.giveaway.giveaways.find(
      (g) => g.messageID === args[0] && g.guildID === message.guild.id
    );
  if (!giveaway) {
    return message.channel.send({
      content: await client.lang.get(
        message.guild,
        "GIVEAWAY/UNABLE_FIND",
        args
      ),
    });
  }
  client.giveaway
    .edit(giveaway.messageID, {
      setEndTimestamp: Date.now(),
    })
    .then(async () => {
      message.channel.send({
        content: await client.lang.get(
          message.guild,
          "GIVEAWAY/WILL_END",
          client
        ),
      });
    })
    .catch(async (e) => {
      if (
        e.startsWith(
          `Giveaway with message ID ${giveaway.messageID} is already ended.`
        )
      ) {
        message.channel.send({
          content: await client.lang.get(message.guild, "GIVEAWAY/ALREADY_END"),
        });
      } else {
        console.error(e);
        message.channel.send({
          content: await client.lang.get(message.guild, "ERROR"),
        });
      }
    });
};
module.exports.reroll = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send({
      content: await client.lang.get(message.guild, "GIVEAWAY/PROVIDE_ID"),
    });
  }
  let giveaway =
    client.giveawaysManager.giveaways.find(
      (g) => g.prize === args.join(" ") && g.guildID === message.guild.id
    ) ||
    client.giveawaysManager.giveaways.find(
      (g) => g.messageID === args[0] && g.guildID === message.guild.id
    );
  if (!giveaway) {
    return message.channel.send({
      content: await client.lang.get(
        message.guild,
        "GIVEAWAY/UNABLE_FIND",
        args
      ),
    });
  }
  client.giveaway
    .reroll(giveaway.messageID)
    .then(async () => {
      message.channel.send({
        content: await client.lang.get(message.guild, "GIVEAWAY/REROLL"),
      });
    })
    .catch(async (e) => {
      if (
        e.startsWith(
          `Giveaway with message ID ${giveaway.messageID} is not ended.`
        )
      ) {
        message.channel.send({
          content: await client.lang.get(message.guild, "GIVEAWAY/ALREADY_END"),
        });
      } else {
        console.error(e);
        message.channel.send({
          content: await client.lang.get(message.guild, "ERROR"),
        });
      }
    });
};
