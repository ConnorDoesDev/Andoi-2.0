const Event = require("../../struct/Event");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildCreate",
    });
  }

  run(guild) {
    const channelID = this.client.settings.channels.guild_log;
    const channel = this.client.channels.cache.get(channelID);
    if (!channel) return;
    const embed = new AndoiEmbed()
      .setTitle("New server here is some info!")
      .addField("Owner:", this.client.users.cache.get(guild.fetchOwnerId()).tag)
      .addField("Members:", guild.members.cache.size);

    channel.send({ embeds: [embed] });
  }
};
