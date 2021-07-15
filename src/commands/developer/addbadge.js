const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const user = require("../../models/user");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "givebadge",
      desc: "Give badge",
      usage: "",
      example: ["help"],
      category: "developer",
      guildOnly: true,
      ownerOnly: true,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["badge", "user"],
      voice: false,
      sameVoice: false,
      aliases: ["gbdg"],
    });
  }

  async run(message, args) {
    const member = this.findMember(message, args, true);
    if (!member) return message.channel.send("Invalid user");
    const findmodel = await user.findOne({
      user: member?.id,
    });

    const badges = {
      0: "<:verified:851096269912801291> - Beta user",
      1: "<:bgift:851096270038761482> - Premium",
      2: "<:partner:863349017862078474> - Partner",
      3: "<:staff:863348556416942080> - Staff",
      4: "<:contributor:863348796606775296> - Contributor",
      5: "<:bughunter:863349423366209537> - Bug hunter",
      6: "<:contributor:863348796606775296> - Developer",
    };
    const badge = badges[parseInt(args[0])];
    if (findmodel) {
      findmodel?.badges?.push(parseInt(args[0]));
      findmodel.save();
    } else {
      await new user({
        user: member.id,
        badges: [parseInt(args[0])],
      }).save();
    }
    message.reply({
      content: `Successfully gave ${member} the badge ${badge}`,
    });
  }
};
