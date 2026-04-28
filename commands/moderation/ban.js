const { SlashCommandBuilder } = require("discord.js");
const getModLogChannel = require("../../utils/getModLogChannel");
const createEmbed = require("../../utils/modEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban user")
    .addUserOption(o =>
      o.setName("user").setRequired(true).setDescription("User")
    )
    .addStringOption(o =>
      o.setName("reason").setDescription("Reason")
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason given";

    await interaction.guild.members.ban(user.id).catch(()=>{});

    const ch = await getModLogChannel(client, interaction.guild.id);

    if (ch) {
      const embed = createEmbed(user, interaction.user, reason);
      ch.send({ embeds: [embed] });
    }

    interaction.editReply("✅ Banned");
  }
};