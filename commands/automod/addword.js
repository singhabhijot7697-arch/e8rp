const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod_addword")
    .setDescription("Add bad word")
    .addStringOption(o =>
      o.setName("word")
        .setDescription("Word to block")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const word = interaction.options.getString("word");

    client.db.run(
      `INSERT INTO automod_words VALUES (?, ?)`,
      [interaction.guild.id, word]
    );

    interaction.editReply("✅ Added");
  }
};