const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod_removeword")
    .setDescription("Remove bad word")
    .addStringOption(o =>
      o.setName("word")
        .setDescription("Word to remove")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const word = interaction.options.getString("word");

    client.db.run(
      `DELETE FROM automod_words WHERE guildId=? AND word=?`,
      [interaction.guild.id, word]
    );

    interaction.editReply("✅ Removed");
  }
};