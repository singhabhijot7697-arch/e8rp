require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");

// ✅ Collect commands
const commands = [];

const folders = fs.readdirSync("./commands");

for (const folder of folders) {
  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`);

    if (!command.data) {
      console.log(`❌ Missing data in: ${file}`);
      continue;
    }

    try {
      commands.push(command.data.toJSON());
    } catch (err) {
      console.log(`❌ Error in: ${file}`);
      console.error(err);
    }
  }
}

// ✅ REST setup
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ✅ Deploy
(async () => {
  try {
    console.log(`🚀 Deploying ${commands.length} commands...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Commands deployed successfully");
  } catch (error) {
    console.error("❌ Deploy error:", error);
  }
})();