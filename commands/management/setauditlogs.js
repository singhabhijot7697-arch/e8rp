const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setauditlogs")
    .setDescription("Set audit logs channel")
    .addChannelOption(o =>
      o.setName("channel")
        .setDescription("Channel for logs")
        .setRequired(true)
    ),

  async execute(interaction) {

    const channel = interaction.options.getChannel("channel");

    // ✅ MUST BE INSIDE FUNCTION
    data.setAudit(interaction.guild.id, channel.id);

    await interaction.editReply(`✅ Audit logs set to ${channel}`);
  }
};