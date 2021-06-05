const { Collection } = require("discord.js");

module.exports = class Wrapper {
  constructor(client, model) {
    this.client = client;
    this.model = model;
    this.items = new Collection();
  }

  async init() {
    const guilds = await this.model.find();

    for (const i in guilds) {
      const guild = guilds[i];
      this.items.set(guild.id, guild.wrapper);
    }
  }

  get(id, key, defaultValue = null) {
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      return value == null ? defaultValue : value;
    }

    return defaultValue;
  }

  async set(id, key, value) {
    const data = this.items.get(id);
    if (!data) {
      this.items.set(id, { key: value });
    } else {
      data[key] = value;
      this.items.set(id, data);
    }

    const doc = await this.getDocument(id);
    doc.wrapper[key] = value;
    doc.markModifed("wrapper");
    return doc.save();
  }
  async push(id, key, value) {
    const data = await this.get(id, key);
    if (data == null) {
      if (!Array.isArray(value)) return await this.set(id, key, [value]);
      return await this.set(key, value);
    }
    if (!Array.isArray(data))
      throw new Error(
        `Expected target type to be Array, received ${typeof data}!`
      );
    if (Array.isArray(value)) return await this.set(key, data.concat(value));
    data.push(value);
    return await this.set(key, data);
  }

  async delete(id, key) {
    const data = this.items.get(id) || {};
    delete data[key];
    const doc = await this.getDocument(id);
    delete doc.wrapper[key];
    doc.markModified("wrapper");
    return doc.save();
  }

  async clear(id) {
    this.items.delete(id);
    const doc = await this.getDocument(id);
    if (doc) await doc.remove();
  }

  async getDocument(id) {
    const obj = await this.model.findOne({ id });
    if (!obj) {
      const newDoc = await new this.model({ id, settings: {} }).save();
      return newDoc;
    }
    return obj;
  }
};
