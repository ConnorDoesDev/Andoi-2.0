const { MessageEmbed } = require("discord.js");

/**
 * A MessageEmbed with the default fields already filled
 * @constructor
 * @param {User} [user] - The user that executed the command that resulted in this embed
 * @param {object} [data] - Data to set in the rich embed
 */
module.exports = class AndoiEbed extends MessageEmbed {
  constructor(user, data = {}) {
    super(data);
    this.setTimestamp();
    if (user) this.setFooter(user.tag);
  }
  error() {
    this.setColor("RED");
  }
  succes() {
    this.setColor("GREEN");
  }
  warning() {
    this.setColor("ORANGE");
  }
  /**
   * Sets the description of this embed based on an array of arrays of strings
   * @param {Array<Array>} Array containing arrays (blocks) of and strings
   * @returns {AndoiEmbed}
   */
  setDescriptionFromBlockArray(blocks) {
    this.description = blocks
      .map((lines) => lines.filter((l) => !!l).join("\n"))
      .filter((b) => !!b.length)
      .join("\n\n");
    return this;
  }
};
