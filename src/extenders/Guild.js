const { Structures } = require("discord.js");
const model = require("../models/guild");
Structures.extend("Guild", (Guild) => {
  return class extends Guild {
    constructor(client, data) {
      super(client, data);
    }
    async get(key, defaultvalue) {
      const m = await model.findOne({
        guild: this.id,
      });
      if (!m) {
        new model({
          guild: this.id,
        }).save();
        return defaultvalue;
      } else {
        if (!m[key]) {
          return defaultvalue;
        } else {
          return m[key];
        }
      }
    }
    async set(key, value) {
      const m = await model.findOne({
        guild: this.id,
      });
      if (!m) {
        const l = new model({
          guild: this.id,
          [key]: value,
        }).save();
        return m;
      }
      if (!m[key]) {
        await m.updateOne({
          [key]: value,
        });
        return m;
      } else {
        m[key] = value;
        m.save();
        return m;
      }
    }
    async push(key, value) {
      const m = await model.findOne({
        guild: this.id,
      });
      if (!m) {
        const l = new model({
          guild: this.id,
          [key]: [value],
        }).save();
        return m;
      }
      if (!m[key]) {
        await m.updateOne({
          [key]: [value],
        });
        return m;
      } else if (Array.isArray(m[key]) && m[key]) {
        m[key] = m[key].concat(value);
        m.save();
        return m;
      } else if (!Array.isArray(m[key]) && m[key]) {
        m[key] = [value];
        m.save();
      }
    }
    async add(key, num) {
      const m = await model.findOne({
        guild: this.id,
      });
      if (!m) {
        new model({
          guild: this.id,
          [key]: num,
        }).save();
        return m;
      } else {
        if (!m[key]) {
          await m.updateOne({
            guild: this.id,
            [key]: num,
          });
          return m;
        } else {
          m[key] += num;
          m.save();
          return m;
        }
      }
    }
    create() {
      const m = new model({
        guild: this.id,
      }).save();
      return m;
    }
    async delete() {
      await model.findOneAndDelete({
        guild: this.id,
      });
      return true;
    }
  };
});
