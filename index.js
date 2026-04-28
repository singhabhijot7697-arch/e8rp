require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// ✅ CREATE CLIENT FIRST
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials)
});

// =======================
// ✅ DATABASE SETUP
// =======================
client.db = new sqlite3.Database("./data.db");

client.db.serialize(() => {

  // whitelist users
  client.db.run(`CREATE TABLE IF NOT EXISTS whitelist (
    userId TEXT PRIMARY KEY
  )`);

  // whitelist roles
  client.db.run(`CREATE TABLE IF NOT EXISTS wl_roles (
    guildId TEXT,
    roleId TEXT,
    PRIMARY KEY (guildId, roleId)
  )`);

  // audit logs
  client.db.run(`CREATE TABLE IF NOT EXISTS config (
    guildId TEXT PRIMARY KEY,
    auditChannel TEXT
  )`);

  // mod logs
  client.db.run(`CREATE TABLE IF NOT EXISTS modlogs (
    guildId TEXT PRIMARY KEY,
    channelId TEXT
  )`);

  // automod
  client.db.run(`CREATE TABLE IF NOT EXISTS automod (
    guildId TEXT,
    userId TEXT,
    type TEXT,
    count INTEGER,
    PRIMARY KEY (guildId, userId, type)
  )`);

  // warn system
  client.db.run(`CREATE TABLE IF NOT EXISTS warns (
    guildId TEXT,
    userId TEXT,
    count INTEGER,
    PRIMARY KEY (guildId, userId)
  )`);

  // automod words
  client.db.run(`CREATE TABLE IF NOT EXISTS automod_words (
    guildId TEXT,
    word TEXT
  )`);

});

// ✅ CASE SYSTEM (FIXED POSITION)
require("./utils/caseManager").create(client);

// =======================
// ✅ COMMAND LOADER
// =======================
client.commands = new Map();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`);

    if (!command.data || !command.execute) {
      console.log(`❌ Invalid command: ${file}`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }
}

console.log(`✅ Loaded ${client.commands.size} commands`);

// =======================
// ✅ EVENT LOADER
// =======================

// load folders (logs)
const eventFolders = fs.readdirSync("./events").filter(f =>
  fs.lstatSync(`./events/${f}`).isDirectory()
);

for (const folder of eventFolders) {
  const files = fs.readdirSync(`./events/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const event = require(`./events/${folder}/${file}`);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

// root events
const rootEvents = fs.readdirSync("./events").filter(f => f.endsWith(".js"));

for (const file of rootEvents) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

console.log(`✅ Events loaded`);

// =======================
// ✅ AUTOMOD + ANTINUKE
// =======================
require("./modules/automod")(client);

// (optional) antinuke
// require("./modules/antinuke")(client);

// =======================
// ✅ READY
// =======================
client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// =======================
// ✅ KEEP ALIVE (RENDER)
// =======================
const PORT = process.env.PORT || 3000;

require("http")
  .createServer((req, res) => res.end("Bot alive"))
  .listen(PORT);

// =======================
// ✅ ERROR HANDLING
// =======================
process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

// =======================
// ✅ LOGIN
// =======================
client.login(process.env.TOKEN);

client.db = new sqlite3.Database("./data.db");

client.db.serialize(() => {

  // ✅ WHITELIST USERS
  client.db.run(`CREATE TABLE IF NOT EXISTS whitelist (
    userId TEXT PRIMARY KEY
  )`);

  // ✅ WHITELIST ROLES
  client.db.run(`CREATE TABLE IF NOT EXISTS wl_roles (
    guildId TEXT,
    roleId TEXT,
    PRIMARY KEY (guildId, roleId)
  )`);

  // ✅ AUDIT LOG CHANNEL
  client.db.run(`CREATE TABLE IF NOT EXISTS config (
    guildId TEXT PRIMARY KEY,
    auditChannel TEXT
  )`);

  // ✅ MOD LOG CHANNEL
  client.db.run(`CREATE TABLE IF NOT EXISTS modlogs (
    guildId TEXT PRIMARY KEY,
    channelId TEXT
  )`);

});