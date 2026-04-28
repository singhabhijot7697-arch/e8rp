const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wl")
    .setDescription("Add user to whitelist")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");

    client.db.run(
      `INSERT OR IGNORE INTO whitelist VALUES (?)`,
      [user.id],
      (err) => {
        if (err) {
          console.error(err);
          return interaction.editReply("❌ Failed");
        }

        interaction.editReply("✅ Added to whitelist");
      }
    );
  }
};