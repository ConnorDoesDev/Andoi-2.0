module.exports = {
  config: {
    prefix: {
      name: "prefix",
      async set(client, message, args) {
        const prefix = args[0];
        if (!prefix)
          return message.channel.send({
            content: await client.lang.get(message.guild, "SETTINGS/NO_PREFIX"),
          });
        if (prefix.length > 4)
          return message.channel.send({
            content: await client.lang.get(
              message.guild,
              "SETTINGS/INVALID_PREFIX"
            ),
          });
        await client.updateConfig(message.guild, {
          prefix: prefix,
        });
        return message.channel.send({
          content: await client.lang.get(
            message.guild,
            "SETTINGS/SUCCESS_PREFIX"
          ),
        });
      },
      async reset(client, message, args) {
        await client.updateConfig(message.guild, {
          prefix: "a!",
        });
        return message.channel.send({
          content: await client.lang.get(
            message.guild,
            "SETTINGS/RESET_PREFIX"
          ),
        });
      },
    },
    chatbot: {
      name: "chatbot",
      async set(client, message, args) {
        const prefix = args[0];
        if (!prefix)
          return message.channel.send({
            content: await client.lang.get(message.guild, "SETTINGS/NO_CHAN"),
          });
        const ch = findChannel(message, args, false);
        if (!ch)
          return message.channel.send({
            content: await client.lang.get(
              message.guild,
              "SETTINGS/INVALID_CHAN"
            ),
          });
        await client.updateConfig(message.guild, {
          chatbot: ch.id,
        });
        return message.channel.send({
          content: await client.lang.get(
            message.guild,
            "SETTINGS/CHATBOT_SUCCESS"
          ),
        });
      },
      async reset(client, message, args) {
        await client.updateConfig(message.guild, {
          chatbot: null,
        });
        return message.channel.send({
          content: await client.lang.get(
            message.guild,
            "SETTINGS/CHATBOT_RESET"
          ),
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
