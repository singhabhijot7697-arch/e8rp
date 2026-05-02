const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wl")
    .setDescription("Add user to whitelist")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction) {

    const user = interaction.options.getUser("user");

    data.addUser(user.id);

    await interaction.editReply("✅ Added to whitelist");
  }
};