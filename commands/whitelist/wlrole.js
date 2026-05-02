const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlrole")
    .setDescription("Add role to whitelist")
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role")
        .setRequired(true)
    ),

  async execute(interaction) {

    const role = interaction.options.getRole("role");

    data.addRole(interaction.guild.id, role.id);

    await interaction.editReply("✅ Role added");
  }
};