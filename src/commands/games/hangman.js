const Command = require("../../struct/gameCommand");
const { Message } = require("discord.js");
module.exports = class HangManCommand extends Command {
  constructor(...args) {
    super(...args, {
      name: "hangman",
      desc: "Guess word",
      category: "games",
      guildOnly: true,
      ownerOnly: false,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: false,
      voice: false,
      sameVoice: false,
      aliases: ["hang"],
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    await this.start(message, {
      game: "hangman",
      gameOptions: {
        client: this.client,
        message,
        channelID: message.channel.id,
      },
    });
  }
};
