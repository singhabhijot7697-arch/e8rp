const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmodlogs")
    .setDescription("Set moderation logs channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel to send mod logs")
        .setRequired(true)
    ),

  async execute(interaction) {

    try {

      const channel = interaction.options.getChannel("channel");

      if (!channel) {
        return interaction.editReply("❌ Invalid channel");
      }

      data.setMod(interaction.guild.id, channel.id);

      return interaction.editReply(`✅ Mod logs set to ${channel}`);

    } catch (err) {
      console.error("SET MOD ERROR:", err);
      return interaction.editReply("❌ Failed to set mod logs");
    }
  }
};