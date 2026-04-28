const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {

    const ch = await getLogChannel(client, member.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.displayAvatarURL()
      })
      .setDescription(
        `**Member left**\n` +
        `<@${member.id}>\n\n` +
        `ID: ${member.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};