const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

function timeAgo(ms) {
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);

  if (d > 0) return `${d}d ${h % 24}h`;
  if (h > 0) return `${h}h ${m % 60}m`;
  return `${m}m`;
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {

    const ch = await getLogChannel(client, member.guild.id);
    if (!ch) return;

    const user = member.user;
    const age = Date.now() - user.createdTimestamp;
    const isNew = age < 86400000;

    let warn = isNew ? `\nNEW ACCOUNT created ${timeAgo(age)} ago\n` : "";

    ch.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x5865F2)
          .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
          .setDescription(
`**Member joined**

<@${user.id}> ${member.guild.memberCount}th to join
${warn}

ID: ${user.id} • ${new Date().toLocaleString()}`
          )
      ]
    });
  }
};