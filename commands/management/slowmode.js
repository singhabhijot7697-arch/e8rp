const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set slowmode")
    .addIntegerOption(o =>
      o.setName("seconds")
        .setDescription("Seconds")
        .setRequired(true)
    ),

  async execute(interaction) {

    const sec = interaction.options.getInteger("seconds");

    await interaction.channel.setRateLimitPerUser(sec);

    interaction.editReply(`✅ Slowmode set to ${sec}s`);
  }
};