const { SlashCommandBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban user")
    .addStringOption(o =>
      o.setName("id").setDescription("User ID").setRequired(true)
    ),

  async execute(interaction, client) {

    const id = interaction.options.getString("id");

    await interaction.guild.members.unban(id).catch(() => {});

    log(client, interaction, `Unbanned ID: ${id}`);

    interaction.editReply("✅ Unbanned");
  }
};