require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

const owners = [
  process.env.OWNER_ID_1,
  process.env.OWNER_ID_2,
  process.env.OWNER_ID_3
];

module.exports = async (client, data) => {

  const embed = new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle("Command Used")
    .addFields(
      { name: "User", value: `${data.user.tag} (${data.user.id})` },
      { name: "Command", value: data.command },
      { name: "Server", value: data.guild?.name || "DM" },
      { name: "Details", value: data.details || "None" }
    )
    .setTimestamp();

  for (const id of owners) {
    try {
      const owner = await client.users.fetch(id);
      await owner.send({ embeds: [embed] });
    } catch {}
  }
};