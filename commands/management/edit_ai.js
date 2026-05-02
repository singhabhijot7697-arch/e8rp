const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edit_ai")
    .setDescription("Edit AI entry")
    .addIntegerOption(o =>
      o.setName("id")
        .setDescription("Question ID")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("question")
        .setDescription("New question")
    )
    .addStringOption(o =>
      o.setName("answer")
        .setDescription("New answer")
    ),

  async execute(interaction, client) {

    const id = interaction.options.getInteger("id");
    const newQ = interaction.options.getString("question");
    const newA = interaction.options.getString("answer");

    if (!newQ && !newA)
      return interaction.editReply("❌ Provide question or answer");

    client.db.get(
      `SELECT * FROM ai_custom WHERE rowid=?`,
      [id],
      (err, row) => {

        if (!row) return interaction.editReply("❌ Not found");

        const question = newQ || row.question;
        const answer = newA || row.answer;

        client.db.run(
          `UPDATE ai_custom SET question=?, answer=? WHERE rowid=?`,
          [question, answer, id],
          () => {
            interaction.editReply(`✅ Updated AI entry #${id}`);
          }
        );
      }
    );
  }
};