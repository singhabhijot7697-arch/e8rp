const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to mute")
        .setRequired(true)
    ),

  async execute(interaction, client, canUse) {

    if (!(await canUse(client, interaction)))
      return interaction.editReply("❌ Not allowed");

    const member = interaction.options.getMember("user");

    await member.timeout(10 * 60 * 1000).catch(() => {});

    interaction.editReply("🔇 User muted");
  }
};