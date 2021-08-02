const Event = require("../../struct/Event");
const logs = require("../../utils/logs");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildMemberAdd",
    });
  }

  async run(member) {
    await logs.add(member.guild.id, "leaves");
    const guild = member.guild;
    const settings = await this.client.getConfig(guild);
    if (settings?.leaveMessage?.enabled) {
      const channel = this.client.channels.cache.get(
        settings?.leaveMessage?.channelID
      );
      if (!channel) return;
      const msg = settings?.leaveMessage?.message
        .replace("{user.username}", member.user.username)
        .replace("{server.name}", member.guild.name)
        .replace("{user}", member)
        .replace("{user.id}", member.user.id)
        .replace("{server.members}", member.guild.memberCount)
        .replace("{server.id}", member.guild.id);
      channel.send({ content: msg });
    }
  }
};
