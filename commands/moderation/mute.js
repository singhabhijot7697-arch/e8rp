const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("time")
        .setDescription("Time (1h, 30m)")
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction.editReply("✅ Muted");
  }
};