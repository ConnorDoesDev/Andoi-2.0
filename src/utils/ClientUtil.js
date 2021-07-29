const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Command = require("../struct/Command");
const Event = require("../struct/Event");
const Interaction = require("../struct/Interaction");
const moment = require("moment");
require("dotenv/config");
const fetch = require("node-fetch");
module.exports = class ClientUtil {
  constructor(client) {
    this.client = client;
  }

  isClass(input) {
    return (
      typeof input &&
      "function" &&
      typeof input.prototype === "object" &&
      input.toString().substring(0, 5) === "class"
    );
  }
  formatDuration(duration) {
    return moment.duration(duration).format("hh:mm:ss", { stopTrim: "m" });
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  removeDupes(array) {
    return [...new Set(array)];
  }

  formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
      minimumFractionDigits,
      maximumFractionDigits: 2,
    });
  }

  capitalise(string) {
    return string
      .split(" ")
      .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
      .join(" ");
  }

  comparePerms(member, target) {
    return member.roles.highest.position < target.roles.highest.position;
  }

  formatPerms(perms) {
    return perms
      .toLowerCase()
      .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
      .replace(/_/g, " ")
      .replace(/Guild/g, "Server")
      .replace(/Use Vad/g, "Use Voice Acitvity");
  }

  formatArray(array, type = "conjunction") {
    return new Intl.ListFormat("en-GB", {
      style: "short",
      type,
    }).format(array);
  }

  async handleCommands() {
    return glob(`${this.directory}commands/**/**/*.js`).then((commands) => {
      for (const commandFile of commands) {
        delete require.cache[commandFile];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File))
          return this.client.log.error(
            "command",
            `Command ${name} doesn't export a class.`
          );
        const command = new File(this.client, name.toLowerCase());
        if (!command instanceof Command)
          return this.client.log.error(
            "command",
            `${name} doesn't belong in commands folder.`
          );
        this.client.commands.set(command.name, command);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            this.client.aliases.set(alias, command.name);
          }
        }
      }
    });
  }

  async handleEvents() {
    return glob(`${this.directory}events/**/*.js`).then((events) => {
      for (const eventFile of events) {
        delete require.cache[eventFile];
        const { name } = path.parse(eventFile);
        const File = require(eventFile);
        if (!this.isClass(File))
          return this.client.log.error(
            "event",
            `Event ${name} doesn't export a class.`
          );
        const event = new File(this.client, name.toLowerCase());
        if (!(event instanceof Event))
          return this.client.log.error(
            "event",
            `${name} doesn't belong in events folder.`
          );
        this.client.events.set(event.name, event);
        event.emitter[event.type](event.name, (...args) => event.run(...args));
      }
    });
  }
  list(arr, conj = "and") {
    const len = arr.length;
    if (len === 0) return "";
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(", ")}${
      len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
    }${arr.slice(-1)}`;
  }
  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time - min * 60);
    const ms = time - sec - min * 60;
    return `${min}:${sec.toString().padStart(2, "0")}.${ms
      .toFixed(4)
      .slice(2)}`;
  }
  base64(text, mode = "encode") {
    if (mode === "encode") return Buffer.from(text).toString("base64");
    if (mode === "decode")
      return Buffer.from(text, "base64").toString("utf8") || null;
    throw new TypeError(`${mode} is not a supported base64 mode.`);
  }
  async binary(text, mode = "encode") {
    if (mode === "encode") {
      const data = await fetch(
        `https://some-random-api.ml/binary?text=${text}`
      ).then((res) => res.json());
      return data.binary;
    }
    if (mode === "decode") {
      const data = await fetch(
        `https://some-random-api.ml/binary?decode=${text}`
      ).then((res) => res.json());
      return data.text;
    }
  }
  makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async handleInteractions() {
    return glob(`${this.directory}interactions/**/*.js`).then(
      (interactions) => {
        for (const interactionFile of interactions) {
          delete require.cache[interactionFile];
          const { name } = path.parse(interactionFile);
          const File = require(interactionFile);
          if (!this.isClass(File))
            throw new TypeError(`Interaction ${name} doesn't export a class.`);
          const interaction = new File(this.client, name.toLowerCase());
          if (!(interaction instanceof Interaction))
            throw new TypeError(
              `Interaction ${name} doesn't belong in Interactions directory.`
            );
          this.client.interactions.set(interaction.name, interaction);
          process.env.dev === "false"
            ? this.client.guilds.cache
                .get("740295580886106233")
                .commands.create(interaction)
            : this.client.application?.commands.create(interaction);
        }
      }
    );
  }

  embed() {
    return new MessageEmbed();
  }

  attachment(buffer, name) {
    return new MessageAttachment(buffer, name ? name : "");
  }
  base64(text, mode = "encode") {
    if (mode === "encode") return Buffer.from(text).toString("base64");
    if (mode === "decode")
      return Buffer.from(text, "base64").toString("utf8") || null;
    throw new TypeError(`${mode} is not a supported base64 mode.`);
  }
  async binary(text, mode = "encode") {
    if (mode === "encode") {
      const data = await fetch(
        `https://some-random-api.ml/binary?text=${text}`
      ).then((res) => res.json());
      return data.binary;
    }
    if (mode === "decode") {
      const data = await fetch(
        `https://some-random-api.ml/binary?decode=${text}`
      ).then((res) => res.json());
      return data.text;
    }
  }
  makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
