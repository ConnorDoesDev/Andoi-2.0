const Event = require("../../struct/Event");
const AndoiEmbed = require("../../struct/AndoiEmbed");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildCreate",
    });
  }

  async run(guild) {
    const channelID = this.client.settings.channels.guild_log;
    const channel = this.client.channels.cache.get(channelID);
    if (!channel) return;
    await this.createData(guild);
    const owner = await guild.fetchOwner();
    const embed = new AndoiEmbed()
      .setTitle("I left a server here is some info!")
      .addField("Owner:", owner.user.username)
      .addField("Members:", guild.members.cache.size);

    channel.send({ embeds: [embed] });
  }
  async deleteData(guild) {
    await this.client.deleteConfig(guild);
  }
};
