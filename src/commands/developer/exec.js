const Command = require("../../struct/Command");
const AndoiEmbed = require("../../struct/AndoiEmbed");
const { Message } = require("discord.js");
const child_process = require("child_process");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "execute",
      desc: "Execute some linux",
      category: "developer",
      guildOnly: true,
      ownerOnly: true,
      userPerms: [],
      botPerms: [],
      nsfw: false,
      args: ["code"],
      voice: false,
      sameVoice: false,
    });
  }
  /**
   * @param {Message} message
   * @param {Array} args
   */
  async run(message, args) {
    const code = args.join(" ");

    await child_process.exec(code, (error, stdout) => {
      let response = error || stdout;
      message.channel.send({ content: `\`\`\`bash\n${response}\`\`\`` });
    });
  }
};
