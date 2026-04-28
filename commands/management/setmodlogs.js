const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setmodlogs")
    .setDescription("Set moderation logs channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel for mod logs")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const channel = interaction.options.getChannel("channel");

    client.db.run(
      `INSERT OR REPLACE INTO modlogs (guildId, channelId) VALUES (?, ?)`,
      [interaction.guild.id, channel.id],
      (err) => {
        if (err) {
          console.error(err);
          return interaction.editReply("❌ Failed to set mod logs");
        }

        interaction.editReply(`✅ Mod logs set to ${channel}`);
      }
    );
  }
};