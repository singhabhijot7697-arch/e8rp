const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "channelDelete",

  async execute(channel, client) {

    const ch = await getLogChannel(client, channel.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setDescription(
        `**Text channel deleted**\n` +
        `Name: ${channel.name}\n` +
        `Category: ${channel.parent?.name || "None"}\n\n` +
        `Channel ID: ${channel.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};