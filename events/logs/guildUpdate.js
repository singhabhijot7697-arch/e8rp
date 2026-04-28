const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "guildUpdate",

  async execute(oldG, newG, client) {
    const ch = await getLogChannel(client, newG.id);
    if (!ch) return;

    if (oldG.name !== newG.name) {
      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setDescription(
          `Server updated\n` +
          `Old Name: ${oldG.name}\nNew Name: ${newG.name}\n\n` +
          `ID: ${newG.id} • ${new Date().toLocaleString()}`
        );

      ch.send({ embeds: [embed] });
    }
  }
};