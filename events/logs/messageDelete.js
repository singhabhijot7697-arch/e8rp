const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "messageDelete",
  async execute(msg, client) {
    if (!msg.guild || !msg.author || msg.author.bot) return;

    const ch = await getLogChannel(client, msg.guild.id);
    if (!ch) return;

    ch.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x5865F2)
          .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL() })
          .setDescription(
`**Message deleted in ${msg.channel}**

${msg.content || "No content"}

Message ID: ${msg.id}
ID: ${msg.author.id} • ${new Date().toLocaleString()}`
          )
      ]
    });
  }
};