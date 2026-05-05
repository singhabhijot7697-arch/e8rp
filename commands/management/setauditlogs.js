const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setauditlogs")
    .setDescription("Set audit logs channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel to send logs")
        .setRequired(true)
    ),

  async execute(interaction) {

    try {

      const channel = interaction.options.getChannel("channel");

      if (!channel) {
        return interaction.editReply("❌ Invalid channel");
      }

      console.log("Saving audit log:", interaction.guild.id, channel.id);

      data.setAudit(interaction.guild.id, channel.id);

      return interaction.editReply(`✅ Audit logs set to ${channel}`);

    } catch (err) {
      console.error("ERROR:", err);
      return interaction.editReply("❌ Failed to set audit logs");
    }
  }
};