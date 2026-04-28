const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "roleDelete",

  async execute(role, client) {
    const ch = await getLogChannel(client, role.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setDescription(
        `Role deleted\n` +
        `${role.name}\n\n` +
        `Role ID: ${role.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};