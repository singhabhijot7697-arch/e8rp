const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod_list")
    .setDescription("List bad words"),

  async execute(interaction, client) {

    client.db.all(
      `SELECT word FROM automod_words WHERE guildId=?`,
      [interaction.guild.id],
      (e, rows) => {

        const list = rows.map(r => r.word).join(", ") || "None";

        interaction.channel.send(list);
        interaction.editReply("✅ Done");
      }
    );
  }
};