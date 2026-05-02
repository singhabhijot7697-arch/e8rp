const { canUse } = require("../utils/permissions");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await interaction.deferReply({ flags: 64 });

    try {

      // ✅ ONLY PLACE WHERE PERMISSION CHECK EXISTS
      if (!(await canUse(client, interaction))) {
        return interaction.editReply("❌ Not allowed");
      }

      await command.execute(interaction, client);

    } catch (err) {
      console.error(err);
      interaction.editReply("❌ Error");
    }
  }
};