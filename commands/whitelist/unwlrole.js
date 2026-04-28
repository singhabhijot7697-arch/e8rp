const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwlrole")
    .setDescription("Remove whitelist role")
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role to remove")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const role = interaction.options.getRole("role");

    client.db.run(
      `DELETE FROM wl_roles WHERE guildId=? AND roleId=?`,
      [interaction.guild.id, role.id]
    );

    interaction.editReply("✅ Role removed");
  }
};