const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const user = require('../../models/user');
module.exports = class PingCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "badges",
      desc: "Displays global users badges",
      category: "utility",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    const tryfind = await user.findOne({
        user: message.author.id
    })
    const badges = {
        0: '<:verified:851096269912801291> - Beta user',
        1: '<:bgift:851096270038761482> - Premium',
        2: '<:partner:863349017862078474> - Partner',
        3: '<:staff:863348556416942080> - Staff',
        4: '<:contributor:863348796606775296> - Contributor',
        5: '<:bughunter:863349423366209537> - Bug hunter',
        6: '<:contributor:863348796606775296> - Developer'
    }
    if(!tryfind){
        const usr = new user({
            user: message.author.id,
            badges: []
        })
        usr.save()
        message.channel.send({ content: lang.BADGES.NO_BADGES })
    }else{
        if (tryfind.badges.length == 0) return message.channel.send({ content: lang.BADGES.NO_BADGES });
        else {
            const embed = new AndoiEmbed()
            .setSuccess();
            let str = '';
            tryfind.badges.forEach(badge => str+=`${badges[badge]}\n`)
            embed.setDescription(str);
            message.channel.send({embeds:[embed]})
        }
    }
  }
};
