const Event = require("../../struct/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildCreate",
    });
  }

  run(guild) {
    this.sendMessage(guild);
    const channelID = this.client.settings.guild_log;
    const channel = this.client.channels.cache.get(channelID);
    if (!channel) return;
    const embed = this.client
      .embed()
      .setTitle("New server here is some info!")
      .addField("Owner:", this.client.users.cache.get(guild.ownerID).tag)
      .addField("Members:", guild.members.cache.size);

    channel.send(embed);
  }
  sendMessage(guild) {
    const channels = guild.channels.cache.array();
    const channel = channels.first();

    const embed = new this.client.embed()
      .setTitle("Hi there!")
      .setDescription("My prefix is `a!` and to see my commands use `a!help`");

    channel.send(embed);
  }
};
