const Event = require("../../struct/Event");
const { Interaction } = require("discord.js");
const btnr = require("../../struct/buttonRoles");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "interactionCreate",
    });
  }
  /**
   *
   * @param {Interaction} interaction
   */
  async run(interaction) {
    if (interaction.isButton()) {
      if (await btnr.buttonclick(this.client, interaction)) return;
    }
    if (interaction.isCommand()) {
      await this.client.application?.commands
        .fetch(interaction.commandID)
        .catch(() => {});
      if (!interaction.guildID) return;
      try {
        const command = this.client.interactions.get(interaction.command?.name);
        if (!command) return;
        await command.run(
          interaction,
          interaction.options.map((value) => value.value)
        );
      } catch (err) {
        interaction.reply({
          content: "Something went terribly wrong.",
          ephemeral: true,
        });
        console.log(err);
      }
    }
  }
};
