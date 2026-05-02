require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials)
});

// ✅ modules (no sqlite)
require("./modules/automod")(client);
require("./modules/ai")(client);

// ✅ commands
client.commands = new Map();
const folders = fs.readdirSync("./commands");

for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));
  for (const file of files) {
    const cmd = require(`./commands/${folder}/${file}`);
    if (cmd.data && cmd.execute) client.commands.set(cmd.data.name, cmd);
  }
}

// ✅ events
const eventFolders = fs.readdirSync("./events").filter(f =>
  fs.lstatSync(`./events/${f}`).isDirectory()
);

for (const folder of eventFolders) {
  const files = fs.readdirSync(`./events/${folder}`).filter(f => f.endsWith(".js"));
  for (const file of files) {
    const ev = require(`./events/${folder}/${file}`);
    if (ev.once) client.once(ev.name, (...a) => ev.execute(...a, client));
    else client.on(ev.name, (...a) => ev.execute(...a, client));
  }
}

const rootEvents = fs.readdirSync("./events").filter(f => f.endsWith(".js"));
for (const file of rootEvents) {
  const ev = require(`./events/${file}`);
  if (ev.once) client.once(ev.name, (...a) => ev.execute(...a, client));
  else client.on(ev.name, (...a) => ev.execute(...a, client));
}

client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// ✅ keep alive
const PORT = process.env.PORT || 3000;
require("http").createServer((_, res) => res.end("OK")).listen(PORT);

// ✅ errors
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.TOKEN);