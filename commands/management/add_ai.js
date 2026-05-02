const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_ai")
    .setDescription("Add AI question & answer")
    .addStringOption(o =>
      o.setName("question")
        .setDescription("Question")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("answer")
        .setDescription("Answer")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    // ✅ OWNER OR WHITELIST ONLY
    const allowed =
      interaction.user.id === process.env.OWNER_ID_1 ||
      interaction.user.id === process.env.OWNER_ID_2 ||
      interaction.user.id === process.env.OWNER_ID_3;

    if (!allowed) return interaction.editReply("❌ Not allowed");

    let question = interaction.options.getString("question").toLowerCase();
    let answer = interaction.options.getString("answer");

    // ✅ BASIC CLEANUP (AUTO FIX ENGLISH)
    answer = answer
      .replace(/\bi\b/g, "I")
      .replace(/\brp\b/g, "RP")
      .replace(/\beight rp\b/g, "Eight RP");

    client.db.run(
      `INSERT INTO ai_custom VALUES (?, ?, ?)`,
      [interaction.guild.id, question, answer]
    );

    interaction.editReply("✅ AI question added");
  }
};