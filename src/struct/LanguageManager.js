module.exports = class languageManager {
  constructor(client) {
    this.client = client;
  }
  async get(guild, value, extra_args) {
    const lang = await guild.get("language", "english");
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
};
