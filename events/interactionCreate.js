const { canUse } = require("../utils/permissions");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    // ✅ only slash commands
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // ✅ PRIVATE REPLY (only user sees)
    await interaction.deferReply({ flags: 64 });

    try {

      // ✅ GLOBAL PERMISSION CHECK (WHITELIST SYSTEM)
      if (!(await canUse(client, interaction))) {
        return interaction.editReply("❌ Not allowed");
      }

      // ✅ RUN COMMAND
      await command.execute(interaction, client);

    } catch (err) {
      console.error("COMMAND ERROR:", err);

      // ✅ SAFE ERROR RESPONSE
      if (!interaction.replied) {
        interaction.editReply("❌ Error");
      }
    }
  }
};