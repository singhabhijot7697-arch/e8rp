const { canUse } = require("../utils/permissions");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {

      // ✅ ALWAYS RESPOND IMMEDIATELY
      await interaction.deferReply({ ephemeral: true });

      // ✅ PERMISSION CHECK
      if (!(await canUse(client, interaction))) {
        return interaction.editReply("❌ Not allowed");
      }

      // ✅ RUN COMMAND SAFELY
      await command.execute(interaction, client);

      // ✅ SAFETY: if command forgot to reply
      if (!interaction.replied && !interaction.deferred) {
        await interaction.editReply("✅ Done");
      }

    } catch (err) {

      console.error("COMMAND ERROR:", err);

      try {
        if (!interaction.replied) {
          await interaction.editReply("❌ Error occurred");
        }
      } catch {}
    }
  }
};