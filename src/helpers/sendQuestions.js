const hasApplied = require("../models/application/applied");
const MessageEmbed = require("../struct/AndoiEmbed");
const exampleLang = require("../locales/english");
const modele = require("../models/application/config");
const { Message, Client, User } = require("discord.js");
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {User} author
 * @param {modele} model
 * @param {exampleLang} lang
 */
module.exports = async (client, message, author, model, lang) => {
  const filter = (res) => res.author.id === message.author.id;
  let ApplicationResponse = "";
  const awaitReply = async (question, filter, limit = 60000) => {
    let e = new MessageEmbed().setDescription(question).setColor("RANDOM");
    const m = await message.author.send({ embeds: [e] });

    return m.channel
      .awaitMessages({ filter, max: 1, time: limit, errors: ["time"] })
      .then((collected) => collected.first().content)
      .catch(console.log);
  };
  for await (const question of model.questions) {
    const response = await awaitReply(`${question}`, filter, 60000 * 30);
    if (!response || response.toLowerCase() === `cancel`) {
      ApplicationResponse = "cancel";
      break;
    }
    ApplicationResponse += `> ${question}\n${response}\n\n`;
  }
  if (ApplicationResponse === "cancel") {
    await author.send({ content: lang.APP.INTERVIEW_CANCEL });
    return true;
  }
  const copy = ApplicationResponse;
  const content = chunkString(copy, 2048);
  await message.author.send({ content: lang.APP.PENDING });
  const db = new hasApplied({
    guildID: message.guild.id,
    userID: author.id,
    appID: generateToken(),
    hasApplied: true,
  });
  await db.save();
  const ch = await client.channels.cache.get(model.appLogs);
  await ch.send({
    embeds: [
      new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(lang.APP.APPROVE_DENY(db))
        .setAuthor(
          `${message.author.tag}'s ${lang.APP.APPLICATION}`,
          message.author.displayAvatarURL() || null
        ),
    ],
  });
  for await (const text of content) {
    await ch.send({
      embeds: [new MessageEmbed().setColor("RANDOM").setDescription(text)],
    });
  }
};
function chunkString(str, length) {
  return str.match(new RegExp(`(.|[\r\n]){1,${length}}`, "g"));
}
function generateToken() {
  var length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
