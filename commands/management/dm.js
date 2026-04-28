const { SlashCommandBuilder } = require("discord.js");
const ownerLog = require("../../utils/ownerLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Send DM")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("message")
        .setDescription("Message")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");
    const msg = interaction.options.getString("message");

    try {
      await user.send(msg);

      // ✅ OWNER LOG
      ownerLog(client, {
        user: interaction.user,
        command: "/dm",
        guild: interaction.guild,
        channel: interaction.channel.name,
        details: `To ${user.tag}: ${msg}`
      });

      interaction.editReply("✅ DM sent");

    } catch {
      interaction.editReply("❌ DM failed");
    }
  }
};