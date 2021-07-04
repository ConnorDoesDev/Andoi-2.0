const GameCommand = require("../../struct/gameCommand");

module.exports = class SnakeCommand extends GameCommand {
  constructor(...args) {
    super(...args, {
      name: "snake",
      desc: "Play snake with someone",
      category: "games",
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
  async run(message, args) {
    await this.start(message, {
      game: "snake",
      gameOptions: {
        message,
        embed: {
          title: await this.client.lang.get(message.guild, "GAMES/SNAKE"),
          color: "RANDOM",
          timestamp: true,
          gameOverTitle: await this.client.lang.get(message.guild, "GAMES/END"),
          score: await this.client.lang.get(message.guild, "GAMES/SCORE"),
        },
        emojis: {
          empty: "⬛", //zone emoji
          snakeBody: "🎃", //snake
          food: "🍕", //food emoji
          //control
          up: "⬆️",
          right: "⬅️",
          down: "⬇️",
          left: "➡️",
        },
      },
    });
  }
};
