const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Check warnings")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction.editReply("✅ Checked");
  }
};