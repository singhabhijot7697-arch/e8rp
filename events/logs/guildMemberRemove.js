const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {

    const ch = await getLogChannel(client, member.guild.id);
    if (!ch) return;

    const user = member.user;

    ch.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x5865F2)
          .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
          .setDescription(
`**Member left**

<@${user.id}>

ID: ${user.id} • ${new Date().toLocaleString()}`
          )
      ]
    });
  }
};