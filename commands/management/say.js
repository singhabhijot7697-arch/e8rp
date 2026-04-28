const { SlashCommandBuilder } = require("discord.js");
const ownerLog = require("../../utils/ownerLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make bot say something")
    .addStringOption(o =>
      o.setName("message")
        .setDescription("Message")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const msg = interaction.options.getString("message");

    await interaction.channel.send(msg);

    // ✅ OWNER LOG
    ownerLog(client, {
      user: interaction.user,
      command: "/say",
      guild: interaction.guild,
      channel: interaction.channel.name,
      details: msg
    });

    interaction.editReply("✅ Sent");
  }
};