const Command = require("./Command");

module.exports = class GameCommand extends Command {
  constructor(...args) {
    super(...args);
  }

  async start(message, opts) {
    const game = opts.game;
    if (!game) throw new Error("Must provide the game!");
    const file = require(`./games/${game}.js`);
    if (!file) throw new Eror("Invalid game name given");
    const g = new file(opts?.gameOptions);
    await g.start(message);
    return;
  }
};
