const { EmbedBuilder } = require("discord.js");

module.exports = function createModEmbed(user, moderator, reason) {

  return new EmbedBuilder()
    .setColor(0x5865F2)
    .setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL()
    })
    .setDescription(
      `Offender: ${user.username} <@${user.id}>\n` +
      `Reason: ${reason || "No reason given"}\n` +
      `Responsible moderator: ${moderator.tag}\n\n` +
      `ID: ${user.id} • ${new Date().toLocaleString()}`
    );
};