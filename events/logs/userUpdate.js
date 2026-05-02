const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "userUpdate",

  async execute(oldUser, newUser, client) {

    if (oldUser.avatar === newUser.avatar) return;

    client.guilds.cache.forEach(async (guild) => {

      // ✅ CHECK USER EXISTS IN GUILD
      const member = await guild.members.fetch(newUser.id).catch(() => null);
      if (!member) return;

      const ch = await getLogChannel(client, guild.id);
      if (!ch) return;

      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setAuthor({
          name: newUser.username,
          iconURL: newUser.displayAvatarURL()
        })
        .setDescription(
          `**Avatar updated**
<@${newUser.id}>`
        )
        .setImage(newUser.displayAvatarURL({ size: 512 }))
        .setFooter({
          text: `ID: ${newUser.id} • ${new Date().toLocaleString()}`
        });

      ch.send({ embeds: [embed] });

    });
  }
};