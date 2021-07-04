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
  },
  valid: ["prefix"],
};
