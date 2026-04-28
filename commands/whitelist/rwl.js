const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rwl")
    .setDescription("Remove user from whitelist")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");

    client.db.run(
      `DELETE FROM whitelist WHERE userId=?`,
      [user.id],
      (err) => {
        if (err) {
          console.error(err);
          return interaction.editReply("❌ Failed");
        }

        interaction.editReply("✅ Removed from whitelist");
      }
    );
  }
};