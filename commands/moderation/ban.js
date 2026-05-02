const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban user")
    .addUserOption(o =>
      o.setName("user").setDescription("User").setRequired(true)
    )
    .addStringOption(o =>
      o.setName("reason").setDescription("Reason")
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason";

    await interaction.guild.members.ban(user.id, { reason }).catch(() => {});

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle("🔨 You have been banned")
      .addFields(
        { name: "Server", value: interaction.guild.name },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    user.send({ embeds: [embed] }).catch(() => {});

    log(client, interaction, `Banned ${user.tag} | ${reason}`);

    interaction.editReply("✅ Banned");
  }
};