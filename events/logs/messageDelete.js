const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "messageDelete",
  async execute(msg, client) {
    if (!msg.guild || msg.author?.bot) return;

    const ch = await getLogChannel(client, msg.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setAuthor({
        name: msg.author.username,
        iconURL: msg.author.displayAvatarURL()
      })
      .setDescription(
        `**Message deleted in ${msg.channel}**\n` +
        `${msg.content || "No content"}\n\n` +
        `Message ID: ${msg.id}\n` +
        `ID: ${msg.author.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};