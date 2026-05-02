const { SlashCommandBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Send DM to a user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to DM")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("message")
        .setDescription("Message content")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");
    const msg = interaction.options.getString("message");

    try {
      await user.send(msg);

      log(client, interaction, `DM to ${user.tag}: ${msg}`);

      // ✅ PRIVATE CONFIRM
      await interaction.editReply("✅ DM sent");

    } catch {
      await interaction.editReply("❌ Couldn't send DM (user has DMs disabled)");
    }
  }
};