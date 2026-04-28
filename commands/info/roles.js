const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Show user roles")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to check roles") // ✅ REQUIRED
        .setRequired(false)
    ),

  async execute(interaction) {

    const member =
      interaction.options.getMember("user") || interaction.member;

    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(" ") || "No roles";

    await interaction.channel.send(roles);
    await interaction.editReply("✅ Sent");
  }
};