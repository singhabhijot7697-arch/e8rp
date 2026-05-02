require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// =======================
// ✅ CREATE CLIENT FIRST
// =======================
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials)
});

// =======================
// ✅ LOAD MODULES (AFTER CLIENT)
// =======================
require("./modules/automod")(client);
require("./modules/ai")(client);

// =======================
// ✅ DATABASE
// =======================
client.db = new sqlite3.Database("./data.db");

client.db.serialize(() => {

  client.db.run(`CREATE TABLE IF NOT EXISTS whitelist (
    userId TEXT PRIMARY KEY
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS wl_roles (
    guildId TEXT,
    roleId TEXT,
    PRIMARY KEY (guildId, roleId)
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS config (
    guildId TEXT PRIMARY KEY,
    auditChannel TEXT
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS modlogs (
    guildId TEXT PRIMARY KEY,
    channelId TEXT
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS automod (
    guildId TEXT,
    userId TEXT,
    type TEXT,
    count INTEGER,
    PRIMARY KEY (guildId, userId, type)
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS automod_words (
    guildId TEXT,
    word TEXT
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS warns (
    guildId TEXT,
    userId TEXT,
    count INTEGER,
    PRIMARY KEY (guildId, userId)
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS ai_channel (
    guildId TEXT PRIMARY KEY,
    channelId TEXT
  )`);

  client.db.run(`CREATE TABLE IF NOT EXISTS ai_custom (
  guildId TEXT,
  question TEXT,
  answer TEXT
)`);

client.db.run(`CREATE TABLE IF NOT EXISTS ai_learning (
  guildId TEXT,
  input TEXT,
  matchedQuestion TEXT
)`);

client.db.run(`CREATE TABLE IF NOT EXISTS config (
  guildId TEXT PRIMARY KEY,
  auditChannel TEXT
)`);

client.db.run(`CREATE TABLE IF NOT EXISTS modlogs (
  guildId TEXT PRIMARY KEY,
  channelId TEXT
)`);

});

// ✅ CASE SYSTEM
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

// folders like /events/logs
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