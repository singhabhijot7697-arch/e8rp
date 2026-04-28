const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlock the channel"),

  async execute(interaction, client, canUse) {

    if (!(await canUse(client, interaction)))
      return interaction.editReply("❌ Not allowed");

    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: true
    });

    interaction.editReply("🔓 Channel unlocked");
  }
};