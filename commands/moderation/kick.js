const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick user")
    .addUserOption(o =>
      o.setName("user").setDescription("User").setRequired(true)
    )
    .addStringOption(o =>
      o.setName("reason").setDescription("Reason")
    ),

  async execute(interaction, client) {

    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason";

    await member.kick(reason).catch(() => {});

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle("👢 You have been kicked")
      .addFields(
        { name: "Server", value: interaction.guild.name },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    member.send({ embeds: [embed] }).catch(() => {});

    log(client, interaction, `Kicked ${member.user.tag} | ${reason}`);

    interaction.editReply("✅ Kicked");
  }
};