const { Guild } = require("discord.js");
const file = require("../locales/english");
module.exports = class languageManager {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Guild} guild
   * @param {String} value
   * @param {any} extra_args
   * @returns {String}
   */
  async get(guild, value, extra_args) {
    const langg = await this.client.getConfig(guild);
    const lang = langg.language;
    const file = require(`../locales/${lang}.js`);
    if (value.includes("/")) {
      const splitCat = value.split("/")[0];
      const needed = value.split("/")[1];
      if (!extra_args) {
        return file[splitCat][needed];
      } else {
        return file[splitCat][needed](extra_args);
      }
    } else {
      if (!extra_args) {
        return file[value];
      } else {
        return file[value](extra_args);
      }
    }
  }
  /**
   *
   * @param {Guild} guild
   * @returns {file} Language
   */
  async getFile(guild) {
    const langg = await this.client.getConfig(guild);
    const lang = langg.language;

    return require(`../locales/${lang}.js`);
  }
};
