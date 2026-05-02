const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Toggle AI in this channel")
    .addStringOption(o =>
      o.setName("mode")
        .setDescription("on / off")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    // ✅ OWNER ONLY
    if (interaction.user.id !== process.env.OWNER_ID_1)
      return interaction.editReply("❌ Owner only");

    const mode = interaction.options.getString("mode");

    if (mode === "on") {
      client.db.run(
        `INSERT OR REPLACE INTO ai_channel VALUES (?, ?)`,
        [interaction.guild.id, interaction.channel.id]
      );

      return interaction.editReply("✅ AI enabled in this channel");
    }

    if (mode === "off") {
      client.db.run(
        `DELETE FROM ai_channel WHERE guildId=?`,
        [interaction.guild.id]
      );

      return interaction.editReply("✅ AI disabled");
    }

  }
};