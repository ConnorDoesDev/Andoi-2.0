const Event = require("../../struct/Event");
const logs = require("../../utils/logs");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildMemberAdd",
    });
  }

  async run(member) {
    await logs.add(member.guild.id, "joins");
    const guild = member.guild;
    const settings = await this.client.getConfig(guild);
    if (settings?.welcomeMessage?.enabled) {
      const channel = this.client.channels.cache.get(
        settings?.welcomeMessage?.channelID
      );
      const msg = settings?.welcomeMessage?.message
        .replace("{user.username}", member.user.username)
        .replace("{server.name}", member.guild.name)
        .replace("{user}", member)
        .replace("{user.id}", member.user.id)
        .replace("{server.members}", member.guild.memberCount)
        .replace("{server.id}", member.guild.id);
      if (!channel) return;
      channel.send({ content: msg });
    }
  }
};
