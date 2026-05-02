const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "messageUpdate",

  async execute(oldMsg, newMsg, client) {

    // ✅ MUST BE INSIDE FUNCTION
    if (!oldMsg.guild || !oldMsg.author || oldMsg.author.bot) return;

    const ch = await getLogChannel(client, oldMsg.guild.id);
    if (!ch) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setAuthor({
        name: oldMsg.author.username,
        iconURL: oldMsg.author.displayAvatarURL()
      })
      .setDescription(
`**Message edited in ${oldMsg.channel}**

**Before:** ${oldMsg.content || "None"}
**After:** ${newMsg.content || "None"}

ID: ${oldMsg.author.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};