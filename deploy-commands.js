require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");

const commands = [];

const folders = fs.readdirSync("./commands");

for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {

    const command = require(`./commands/${folder}/${file}`);

    // ✅ FIX: skip broken commands
    if (!command.data || !command.execute) {
      console.log(`❌ Skipped invalid command: ${file}`);
      continue;
    }

    try {
      commands.push(command.data.toJSON());
    } catch (err) {
      console.log(`❌ Error in ${file}:`, err.message);
    }
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {

    console.log(`🚀 Registering ${commands.length} commands...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Commands registered successfully");

  } catch (error) {
    console.error("❌ Error:", error);
  }
})();