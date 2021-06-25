const Event = require("../../struct/Event");
const { Giveaway } = require("discord-giveaways");
const { GuildMember, MessageReaction } = require("discord.js");
const bot = require("../../bot");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "giveawayReactionAdded",
      emitter: bot.giveaway,
    });
  }
  /**
   *
   * @param {Giveaway} giveaway
   * @param {GuildMember} member
   * @param {MessageReaction} reaction
   */
  async run(giveaway, member, reaction) {
    if (giveaway.data.extraData?.role) {
      const guild = this.client.guilds.cache.get(member.guild.id);
      const role = guild.roles.cache.get(giveaway.data.extraData?.role);
      if (!member.roles.cache.get(role.id)) {
        reaction.users.remove(member.user);
        const url = `https://discord.com/channels/${giveaway.channelID}/${giveaway.messageID}`;
        const toSend = await this.client.lang.get(
          guild,
          "GIVEAWAYS/INCORRECT_ENTER",
          {
            link: url,
            role,
          }
        );
        await member.send(toSend);
      } else {
        return;
      }
    }
  }
};
