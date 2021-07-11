const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message, MessageButton, MessageActionRow } = require("discord.js");
const arr = ["1️⃣", "2️⃣"];
const fetch = require("node-fetch");
module.exports = class WyrCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "wyr",
      desc: "Would you rather.",
      category: "fun",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const lang = await this.lang.getFile(message.guild);
    message.channel.startTyping();
    const data = await fetch("https://api.tovade.xyz/v1/fun/wyr").then((res) =>
      res.json()
    );

    let btn1 = new MessageButton()
      .setEmoji(arr[0])
      .setStyle("PRIMARY")
      .setCustomId("1");

    let btn2 = new MessageButton()
      .setEmoji(arr[1])
      .setCustomId("2")
      .setStyle("PRIMARY");
    let row = new MessageActionRow().addComponents([btn1, btn2]);
    const embed = new AndoiEmbed()
      .setTitle(lang.FUN.WYR)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`${data.questions[0]} OR ${data.questions[1]}`)
      .setTimestamp();

    const editEmbed = new AndoiEmbed()
      .setTitle(lang.FUN.WYR)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(
        `${data.questions[0]} ${data.percentage[1]}% OR ${data.questions[1]} ${data.percentage[2]}%`
      )
      .setTimestamp();
    message.channel.stopTyping();
    const msg = await message.channel.send({
      embeds: [embed],
      components: [row],
    });
    const filter = (m) => m.user.id === message.author.id;
    const collect = await msg.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collect.on("collect", (msge) => {
      if (msge.customID === "1") {
        collect.stop();
        btn1 = new MessageButton()
          .setEmoji(arr[0])
          .setCustomId("1")
          .setDisabled(true)
          .setStyle("PRIMARY");

        btn2 = new MessageButton()
          .setEmoji(arr[1])
          .setCustomId("2")
          .setDisabled(true)
          .setStyle("PRIMARY");
        row = new MessageActionRow().addComponents([btn1, btn2]);

        msge.update({ embeds: [editEmbed], components: [row] });
      } else if (msge.customID === "2") {
        collect.stop();
        btn1 = new MessageButton()
          .setEmoji(arr[0])
          .setCustomId("1")
          .setDisabled(true)
          .setStyle("PRIMARY");

        btn2 = new MessageButton()
          .setEmoji(arr[1])
          .setCustomId("2")
          .setDisabled(true)
          .setStyle("PRIMARY");
        row = new MessageActionRow().addComponents([btn1, btn2]);
        msge.update({ embeds: [editEmbed], components: [row] });
      }
    });
  }
};
