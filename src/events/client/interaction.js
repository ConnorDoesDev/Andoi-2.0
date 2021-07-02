const Event = require("../../struct/Event");
const { Interaction } = require("discord.js");
const btnr = require("../../struct/buttonRoles");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "interaction",
    });
  }
  /**
   *
   * @param {Interaction} interaction
   */
  async run(interaction) {
    if (interaction.isButton) {
      if (await btnr.buttonclick(this.client, interaction)) return;
    }
  }
};
