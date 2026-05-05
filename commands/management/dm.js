const { SlashCommandBuilder } = require("discord.js");
const ownerLog = require("../../utils/ownerLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Send DM to user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to DM")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Message content")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");

    try {

      // ✅ SEND DM
      await user.send(message);

      // ✅ OWNER LOG
      ownerLog(client, {
        user: interaction.user,
        command: "/dm",
        guild: interaction.guild,
        details: `To ${user.tag}: ${message}`
      });

      // ✅ PRIVATE RESPONSE
      await interaction.editReply("✅ DM sent");

    } catch (err) {

      console.error(err);

      // ✅ PRIVATE ERROR
      await interaction.editReply("❌ Could not send DM (user has DMs off)");
    }
  }
};