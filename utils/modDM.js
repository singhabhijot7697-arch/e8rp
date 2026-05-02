const { EmbedBuilder } = require("discord.js");

module.exports = function createDM(action, guild, moderator, reason, extra) {

  const embed = new EmbedBuilder()
    .setColor(0xED4245)
    .setTitle(`Moderation Action: ${action}`)
    .addFields(
      { name: "Server", value: guild.name },
      { name: "Moderator", value: moderator.tag },
      { name: "Reason", value: reason || "No reason given" }
    )
    .setTimestamp();

  if (extra) {
    embed.addFields({ name: "Details", value: extra });
  }

  return embed;
};