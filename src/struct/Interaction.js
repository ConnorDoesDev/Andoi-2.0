const langManager = require("./LanguageManager");
module.exports = class Interaction {
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.lang = new langManager(this.client);
    this.description = options.description || "No description provided.";
    this.options = options.options || [];
  }
  async run(interaction, args) {
    throw new Error(`Interaction ${this.name} doesn't provide a run method`);
  }
};
