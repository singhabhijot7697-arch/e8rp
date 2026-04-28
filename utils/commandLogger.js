const getModLogChannel = require("./getModLogChannel");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction, details) => {

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL()
    })
    .setDescription(
      `${interaction.commandName} used\n` +
      `${details}\n\n` +
      `ID: ${interaction.user.id} • ${new Date().toLocaleString()}`
    );

  const ch = await getModLogChannel(client, interaction.guild.id);
  if (ch) ch.send({ embeds: [embed] });
};