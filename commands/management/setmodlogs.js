const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmodlogs")
    .setDescription("Set mod logs channel")
    .addChannelOption(o =>
      o.setName("channel")
        .setDescription("Channel")
        .setRequired(true)
    ),

  async execute(interaction) {

    const channel = interaction.options.getChannel("channel");

    // ✅ FIX
    data.setMod(interaction.guild.id, channel.id);

    await interaction.editReply(`✅ Mod logs set to ${channel}`);
  }
};