require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");

const commands = [];

// ✅ LOAD COMMANDS
const folders = fs.readdirSync("./commands");

for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

// ✅ REST
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ✅ DEPLOY
(async () => {
  try {
    console.log(`🚀 Registering ${commands.length} commands...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Commands registered successfully");

  } catch (err) {
    console.error("❌ Error:", err);
  }
})();