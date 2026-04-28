const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "roleUpdate",

  async execute(oldRole, newRole, client) {
    const ch = await getLogChannel(client, newRole.guild.id);
    if (!ch) return;

    let changes = [];

    if (oldRole.name !== newRole.name)
      changes.push(`Name: ${oldRole.name} → ${newRole.name}`);

    if (oldRole.hexColor !== newRole.hexColor)
      changes.push(`Color: ${oldRole.hexColor} → ${newRole.hexColor}`);

    if (!changes.length) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setDescription(
        `Role updated\n` +
        `${changes.join("\n")}\n\n` +
        `Role ID: ${newRole.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};