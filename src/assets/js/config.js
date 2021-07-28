const Client = require("../../struct/Bot");
const { Message } = require("discord.js");
module.exports = {
  config: {
    prefix: {
      name: "prefix",
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {string[]} args
       */
      async set(client, message, args) {
        const prefix = args[0];
        const lang = await client.lang.getFile(message.guild);
        if (!prefix)
          return message.channel.send({
            content: lang.SETTINGS.NO_PREFIX,
          });
        if (prefix.length > 4)
          return message.channel.send({
            content: lang.SETTINGS.INVALID_PREFIX,
          });
        await client.updateConfig(message.guild, {
          prefix: prefix,
        });
        return message.channel.send({
          content: lang.SETTINGS.SUCCESS_PREFIX,
        });
      },
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {string[]} args
       */
      async reset(client, message, args) {
        const lang = await client.lang.getFile(message.guild);
        await client.updateConfig(message.guild, {
          prefix: "a!",
        });
        return message.channel.send({
          content: lang.SETTINGS.RESET_PREFIX,
        });
      },
    },
    chatbot: {
      name: "chatbot",
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {string[]} args
       */
      async set(client, message, args) {
        const lang = await client.lang.getFile(message.guild);
        const prefix = args[0];
        if (!prefix)
          return message.channel.send({
            content: lang.SETTINGS.NO_CHAN,
          });
        const ch = findChannel(message, args, false);
        if (!ch)
          return message.channel.send({
            content: lang.SETTINGS.INVALID_CHAN,
          });
        await client.updateConfig(message.guild, {
          chatbot: ch.id,
        });
        return message.channel.send({
          content: lang.SETTINGS.CHATBOT_SUCCESS,
        });
      },
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {string[]} args
       */
      async reset(client, message, args) {
        const lang = await client.lang.getFile(message.guild);
        await client.updateConfig(message.guild, {
          chatbot: null,
        });
        return message.channel.send({
          content: lang.SETTINGS.CHATBOT_RESET,
        });
      },
    },
  },
  valid: ["prefix", "chatbot"],
};

function findChannel(message, args, allowauthor = false) {
  let channel;

  channel =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]) ||
    message.guild.channels.cache.find((r) => r.name === args[0]) ||
    message.guild.channels.cache.find((r) => r.name.startsWith(args[0]));

  if (!channel && allowauthor) {
    channel = message.channel;
  }
  return channel;
}
