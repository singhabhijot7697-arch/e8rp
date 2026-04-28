const { SlashCommandBuilder } = require("discord.js");
const getModLogChannel = require("../../utils/getModLogChannel");
const createEmbed = require("../../utils/modEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick user")
    .addUserOption(o =>
      o.setName("user").setRequired(true).setDescription("User")
    )
    .addStringOption(o =>
      o.setName("reason").setDescription("Reason")
    ),

  async execute(interaction, client) {

    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason given";

    await member.kick(reason).catch(()=>{});

    const ch = await getModLogChannel(client, interaction.guild.id);

    if (ch) {
      const embed = createEmbed(member.user, interaction.user, reason);
      ch.send({ embeds: [embed] });
    }

    interaction.editReply("✅ Kicked");
  }
};