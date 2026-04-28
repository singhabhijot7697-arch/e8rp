const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Send custom embed")
    .addStringOption(o =>
      o.setName("title")
        .setDescription("Embed title")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("description")
        .setDescription("Embed description")
        .setRequired(true)
    ),

  async execute(interaction) {

    const title = interaction.options.getString("title");
    const desc = interaction.options.getString("description");

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle(title)
      .setDescription(desc);

    interaction.channel.send({ embeds: [embed] });
    interaction.editReply("✅ Sent");
  }
};