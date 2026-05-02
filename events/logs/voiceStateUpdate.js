const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldS, newS, client) {

    const ch = await getLogChannel(client, newS.guild.id);
    if (!ch) return;

    const user = newS.member.user;

    if (!oldS.channel && newS.channel) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Member joined voice channel**

**${user.username}** joined ${newS.channel}

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    if (oldS.channel && !newS.channel) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Member left voice channel**

**${user.username}** left ${oldS.channel}

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    if (oldS.channel && newS.channel && oldS.channelId !== newS.channelId) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
            .setDescription(
`**Member changed voice channel**

**Before:** ${oldS.channel}
**After:** ${newS.channel}

ID: ${user.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }
  }
};