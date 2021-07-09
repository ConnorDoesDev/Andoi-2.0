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
        0: 'Beta user',
        1: 'Premium',
        2: 'Partner',
        3: 'Staff',
        4: 'Contributor',
        5: 'Bug hunter',
        6: 'Developer'
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
            tryfind.badges.forEach(badge => str+=`${badges[badge]}, `)
            embed.setDescription(str);
            message.channel.send({embeds:[embed]})
        }
    }
  }
};
