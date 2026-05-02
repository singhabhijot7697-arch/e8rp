const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Add or remove role")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    )
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role")
        .setRequired(true)
    ),

  async execute(interaction, client, canUse) {

    if (!(await canUse(client, interaction)))
      return interaction.editReply("❌ Not allowed");

    const member = interaction.options.getMember("user");
    const role = interaction.options.getRole("role");

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      interaction.editReply("➖ Role removed");
    } else {
      await member.roles.add(role);
      interaction.editReply("➕ Role added");
    }
  }
};