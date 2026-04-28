require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");

const commands = [];
const names = new Map(); // ✅ track duplicates

const folders = fs.readdirSync("./commands");

for (const folder of folders) {

  const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

  for (const file of files) {

    const path = `./commands/${folder}/${file}`;
    const cmd = require(path);

    // ✅ CHECK DATA EXISTS
    if (!cmd.data) {
      console.log(`❌ Missing data in: ${file}`);
      continue;
    }

    // ✅ CHECK DUPLICATES
    const name = cmd.data.name;

    if (names.has(name)) {
      console.log(`❌ DUPLICATE COMMAND: "${name}"`);
      console.log(`   → ${names.get(name)}`);
      console.log(`   → ${file}`);
      continue;
    }

    names.set(name, file);

    // ✅ VALIDATE COMMAND
    try {
      const json = cmd.data.toJSON();
      commands.push(json);
    } catch (err) {
      console.log(`\n❌ BROKEN COMMAND: ${file}`);
      console.error(err);
    }
  }
}

// ✅ REST SETUP
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ✅ DEPLOY
(async () => {
  try {
    console.log(`\n🚀 Deploying ${commands.length} valid commands...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Commands deployed successfully");

  } catch (error) {
    console.error("❌ Deploy error:", error);
  }
})();