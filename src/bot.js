const Bot = require("./struct/Bot");
const AndoiEmbed = require("./struct/AndoiEmbed");
const bot = new Bot();

bot.build();
require("./utils/GuildDB")(bot);
bot.giveaway.on("giveawayReactionAdded", async (giveaway, member, reaction) => {
  if (giveaway.data.extraData?.role) {
    const guild = bot.guilds.cache.get(member.guild.id);
    const role = guild.roles.cache.get(giveaway.data.extraData?.role);
    if (!member.roles.cache.get(role.id)) {
      reaction.users.remove(member.user);
      const url = `https://discord.com/channels/${giveaway.channelID}/${giveaway.messageID}`;
      const toSend = await bot.lang.get(guild, "GIVEAWAY/INCORRECT_ENTER", {
        link: url,
        role,
      });
      await member
        .send({ embeds: [new AndoiEmbed(member.user).setDescription(toSend)] })
        .catch(() => {});
    } else {
      return;
    }
  }
});
