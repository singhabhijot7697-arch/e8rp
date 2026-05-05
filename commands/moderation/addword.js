const { SlashCommandBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addword")
    .setDescription("Add word to automod")
    .addStringOption(o =>
      o.setName("word")
        .setDescription("Word to block")
        .setRequired(true)
    ),

  async execute(interaction) {

    const word = interaction.options.getString("word").toLowerCase();

    data.addWord(interaction.guild.id, word);

    await interaction.editReply(`✅ Added word: ${word}`);
  }
};