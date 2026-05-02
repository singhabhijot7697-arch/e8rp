const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list_ai")
    .setDescription("List AI data")
    .addStringOption(o =>
      o.setName("type")
        .setDescription("q = questions, a = answers")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const type = interaction.options.getString("type");

    client.db.all(
      `SELECT rowid, question, answer FROM ai_custom WHERE guildId=?`,
      [interaction.guild.id],
      (err, rows) => {

        if (!rows.length) return interaction.editReply("No data");

        let text = rows.map(r => {
          if (type === "q") return `#${r.rowid} → ${r.question}`;
          if (type === "a") return `#${r.rowid} → ${r.answer}`;
        }).join("\n");

        interaction.channel.send(text);
        interaction.editReply("✅ Sent");
      }
    );
  }
};