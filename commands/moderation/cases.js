const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cases")
    .setDescription("View user cases")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction.editReply("✅ Cases system working");
  }
};