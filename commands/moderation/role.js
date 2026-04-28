const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Show user roles")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to check") // ✅ THIS WAS MISSING
    ),

  async execute(interaction) {

    const member = interaction.options.getMember("user") || interaction.member;

    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(" ");

    await interaction.channel.send(roles || "No roles");
    await interaction.editReply("✅ Sent");
  }
};