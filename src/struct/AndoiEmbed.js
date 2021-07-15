const { MessageEmbed } = require("discord.js");

/**
 * A MessageEmbed with the default fields already filled
 * @constructor
 * @param {User} [user] - The user that executed the command that resulted in this embed
 * @param {object} [data] - Data to set in the rich embed
 */
module.exports = class AndoiEmbed extends MessageEmbed {
  constructor(user, data = {}) {
    super(data);
    this.setTimestamp();
    if (user) {
      this.setFooter(user.tag, user.displayAvatarURL({ format: "png" }));
      this.setAuthor(user.username, user.displayAvatarURL({ format: "png" }));
    }
  }
  setSuccess() {
    this.setColor("GREEN");
    return this;
  }
  setError() {
    this.setColor("RED");
    return this;
  }
  setWarning() {
    this.setColor("ORANGE");
    return this;
  }
  setDescription(description) {
    this.description = verifyString(description);
    return this;
  }
  setFooter(text, iconURL) {
    this.footer = {
      text: verifyString(text),
      iconURL,
    };
    return this;
  }
  setTitle(title) {
    this.title = verifyString(title);
    return this;
  }
  static normalizeField(name, value, inline = false) {
    return {
      name: verifyString(name),
      value: verifyString(value),
      inline,
    };
  }
  setAuthor(name, iconURL, url) {
    this.author = {
      name: verifyString(name),
      iconURL,
      url,
    };
    return this;
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
function verifyString(data) {
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data.join("\n");
  return String(data);
}
