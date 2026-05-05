const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeword")
    .setDescription("Remove word from automod")
    .addStringOption(o =>
      o.setName("word")
        .setDescription("Word to remove")
        .setRequired(true)
    ),

  async execute(interaction) {

    const word = interaction.options.getString("word").toLowerCase();

    data.removeWord(interaction.guild.id, word);

    await interaction.editReply(`✅ Removed word: ${word}`);
  }
};