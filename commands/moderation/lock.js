const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock the channel"),

  async execute(interaction, client, canUse) {

    if (!(await canUse(client, interaction)))
      return interaction.editReply("❌ Not allowed");

    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false
    });

    interaction.editReply("🔒 Channel locked");
  }
};