const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remind")
    .setDescription("Set reminder")
    .addStringOption(o =>
      o.setName("time")
        .setDescription("Time")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("text")
        .setDescription("Reminder text")
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction.editReply("✅ Reminder set");
  }
};