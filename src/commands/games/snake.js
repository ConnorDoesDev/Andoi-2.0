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
        title: await message.t("GAMES/SNAKE"),
        color: "RANDOM",
        timestamp: true,
        gameOverTitle: await message.t("GAMES/END"),
        score: await message.t("GAMES/SCORE"),
      },
    });
  }
};
