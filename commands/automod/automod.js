const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod_toggle")
    .setDescription("Enable/Disable automod"),

  async execute(interaction, client) {

    client.db.run(
      `CREATE TABLE IF NOT EXISTS automod_toggle (guildId TEXT PRIMARY KEY, enabled INTEGER)`
    );

    client.db.get(
      `SELECT enabled FROM automod_toggle WHERE guildId=?`,
      [interaction.guild.id],
      (e, row) => {

        let state = row ? (row.enabled ? 0 : 1) : 1;

        client.db.run(
          `INSERT OR REPLACE INTO automod_toggle VALUES (?, ?)`,
          [interaction.guild.id, state]
        );

        interaction.editReply(`✅ Automod ${state ? "Enabled" : "Disabled"}`);
      }
    );
  }
};