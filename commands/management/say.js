const { SlashCommandBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make bot say something")
    .addStringOption(o =>
      o.setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    const msg = interaction.options.getString("message");

    // ✅ SEND TO CHANNEL
    await interaction.channel.send(msg);

    // ✅ LOG
    log(client, interaction, `Message: ${msg}`);

    // ✅ PRIVATE CONFIRM
    await interaction.editReply("✅ Sent");
  }
};