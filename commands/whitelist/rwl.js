const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rwl")
    .setDescription("Remove user from whitelist")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction) {

    const user = interaction.options.getUser("user");

    data.removeUser(user.id);

    await interaction.editReply("✅ Removed from whitelist");
  }
};