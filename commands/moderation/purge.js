const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete messages")
    .addIntegerOption(o =>
      o.setName("amount")
        .setDescription("Amount to delete")
        .setRequired(true)
    ),

  async execute(interaction, client, canUse) {
    if (!(await canUse(client, interaction)))
      return interaction.editReply("❌ Not allowed");

    const amount = interaction.options.getInteger("amount");

    const msgs = await interaction.channel.bulkDelete(amount, true);
    interaction.editReply(`✅ Deleted ${msgs.size}`);
  }
};