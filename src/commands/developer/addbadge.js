const Command = require("../../struct/Command");
const util = require("util");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const user = require('../../models/user')
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
      args: ["badge"],
      voice: false,
      sameVoice: false,
      aliases: ["gbdg"],
    });
  }

  async run(message, args) {
    if(!args[0]) return message.channel.send({content: 'Give user ID'})
    if(!args[1] || isNaN(args[1])) return message.channel.send({content: 'Give user ID'})
    const findmodel = await user.findOne({
        user: args[0]
    })
    findmodel.badges.push(parseInt(args[1]))
    findmodel.save()
    message.reply('done')
  }
};
