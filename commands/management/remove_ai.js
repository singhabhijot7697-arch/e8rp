const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove_ai")
    .setDescription("Remove AI question")
    .addIntegerOption(o =>
      o.setName("id")
        .setDescription("Question ID")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const id = interaction.options.getInteger("id");

    client.db.run(
      `DELETE FROM ai_custom WHERE rowid=?`,
      [id],
      (err) => {
        if (err) return interaction.editReply("❌ Failed");

        interaction.editReply(`✅ Removed AI entry #${id}`);
      }
    );
  }
};