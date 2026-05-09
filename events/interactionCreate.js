const { canUse } = require("../utils/permissions");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {

      // ✅ PERMISSION FIRST (no defer yet)
      if (!(await canUse(client, interaction))) {
        return interaction.reply({ content: "❌ Not allowed", flags: 64 });
      }

      // ✅ RUN COMMAND (each command handles its own defer)
      await command.execute(interaction, client);

    } catch (err) {
      console.error("COMMAND ERROR:", err);

      // ✅ SAFE RESPOND
      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply("❌ Error occurred");
        } else {
          await interaction.reply({ content: "❌ Error occurred", flags: 64 });
        }
      } catch {}
    }
  }
};