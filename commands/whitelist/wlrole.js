const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlrole")
    .setDescription("Whitelist role")
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role to whitelist")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const role = interaction.options.getRole("role");

    client.db.run(
      `INSERT OR IGNORE INTO wl_roles VALUES (?, ?)`,
      [interaction.guild.id, role.id]
    );

    interaction.editReply("✅ Role whitelisted");
  }
};