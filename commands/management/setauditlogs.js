const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setauditlogs")
    .setDescription("Set audit logs channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel for logs")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const channel = interaction.options.getChannel("channel");

    client.db.run(
      `INSERT OR REPLACE INTO config (guildId, auditChannel) VALUES (?, ?)`,
      [interaction.guild.id, channel.id],
      (err) => {
        if (err) {
          console.error(err);
          return interaction.editReply("❌ Failed to set audit logs");
        }

        interaction.editReply(`✅ Audit logs set to ${channel}`);
      }
    );
  }
};