const { SlashCommandBuilder } = require("discord.js");
const ownerLog = require("../../utils/ownerLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Send message as bot")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const message = interaction.options.getString("message");

    // ✅ SEND MESSAGE TO CHANNEL
    await interaction.channel.send(message);

    // ✅ OWNER DM LOG
    ownerLog(client, {
      user: interaction.user,
      command: "/say",
      guild: interaction.guild,
      details: message
    });

    // ✅ PRIVATE CONFIRMATION
    await interaction.editReply("✅ Sent");
  }
};