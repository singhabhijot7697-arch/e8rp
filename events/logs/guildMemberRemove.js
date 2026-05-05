const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

// ✅ TIME FORMAT
function timeAgo(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days, ${hours % 24} hours`;
  if (hours > 0) return `${hours} hours, ${minutes % 60} minutes`;
  return `${minutes} minutes`;
}

module.exports = {
  name: "guildMemberRemove",

  async execute(member, client) {

    if (!member.guild) return;

    const ch = await getLogChannel(client, member.guild.id);
    if (!ch) return;

    const user = member.user;

    // ✅ ROLES
    const roles = member.roles.cache
      .filter(r => r.id !== member.guild.id)
      .map(r => `<@&${r.id}>`)
      .join(" ") || "None";

    // ✅ JOIN TIME
    let joinTime = "Unknown";
    if (member.joinedTimestamp) {
      const time = Date.now() - member.joinedTimestamp;
      joinTime = `${timeAgo(time)} ago`;
    }

    // ✅ EMBED
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL()
      })
      .setDescription(
`**Member left**

<@${user.id}>

**Joined:** ${joinTime}
**Roles:** ${roles}

ID: ${user.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};