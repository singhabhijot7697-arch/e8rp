const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

function formatPerms(overwrites) {
  let text = "";

  overwrites.forEach(o => {
    const name = o.type === 0 ? `<@&${o.id}>` : `<@${o.id}>`;

    text += `Role override for ${name}\n`;

    o.allow.toArray().forEach(p => {
      text += `${p}: ✅\n`;
    });

    o.deny.toArray().forEach(p => {
      text += `${p}: ❌\n`;
    });
  });

  return text || "No overrides";
}

module.exports = {
  name: "channelCreate",

  async execute(channel, client) {

    const ch = await getLogChannel(client, channel.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setDescription(
        `**Text channel created**\n` +
        `Name: ${channel.name}\n` +
        `Category: ${channel.parent?.name || "None"}\n\n` +
        `${formatPerms(channel.permissionOverwrites.cache)}\n\n` +
        `Channel ID: ${channel.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};