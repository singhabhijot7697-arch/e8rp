const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldM, newM, client) {

    const ch = await getLogChannel(client, newM.guild.id);
    if (!ch) return;

    const user = newM.user;

    const added = newM.roles.cache.filter(r => !oldM.roles.cache.has(r.id));
    const removed = oldM.roles.cache.filter(r => !newM.roles.cache.has(r.id));

    if (added.size > 0) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Role added**
${added.map(r => `<@&${r.id}>`).join(", ")}

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    if (removed.size > 0) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Role removed**
${removed.map(r => `<@&${r.id}>`).join(", ")}

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    if (!oldM.communicationDisabledUntil && newM.communicationDisabledUntil) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Member Timeout**
<@${user.id}>

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    if (oldM.communicationDisabledUntil && !newM.communicationDisabledUntil) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Member Removed From Timeout**
<@${user.id}>

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }
  }
};