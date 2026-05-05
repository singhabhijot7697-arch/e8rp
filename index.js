require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");

// =======================
// ✅ CREATE CLIENT
// =======================
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: [Partials.Channel]
});

// =======================
// ✅ COMMAND LOADER
// =======================
client.commands = new Map();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`);

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }
}

console.log(`✅ Loaded ${client.commands.size} commands`);

// =======================
// ✅ INTERACTION HANDLER
// =======================
const { canUse } = require("./utils/permissions");

client.on("interactionCreate", async (interaction) => {

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {

    // ✅ ALWAYS REPLY FAST
    await interaction.deferReply({ ephemeral: true });

    // ✅ PERMISSION CHECK
    if (!(await canUse(client, interaction))) {
      return interaction.editReply("❌ Not allowed");
    }

    // ✅ RUN COMMAND
    await command.execute(interaction, client);

    // ✅ SAFETY (prevents timeout)
    if (!interaction.replied && !interaction.deferred) {
      await interaction.editReply("✅ Done");
    }

  } catch (err) {

    console.error("COMMAND ERROR:", err);

    try {
      await interaction.editReply("❌ Error occurred");
    } catch {}
  }
});

// =======================
// ✅ EVENT LOADER (FIXED)
// =======================
const eventFiles = fs.readdirSync("./events");

for (const file of eventFiles) {

  const fullPath = `./events/${file}`;
  const stat = fs.lstatSync(fullPath);

  // ✅ IF FOLDER (like logs)
  if (stat.isDirectory()) {

    const subFiles = fs.readdirSync(fullPath).filter(f => f.endsWith(".js"));

    for (const sub of subFiles) {
      const event = require(`${fullPath}/${sub}`);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }

  }

  // ✅ IF FILE (like interactionCreate.js)
  else if (file.endsWith(".js")) {

    const event = require(fullPath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

console.log("✅ Events loaded");

// =======================
// ✅ READY
// =======================
client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// =======================
// ✅ KEEP ALIVE (RENDER)
// =======================
require("http")
  .createServer((req, res) => res.end("OK"))
  .listen(process.env.PORT || 3000);

// =======================
// ✅ ERROR HANDLING
// =======================
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// =======================
// ✅ LOGIN
// =======================
client.login(process.env.TOKEN);