const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const log = require("../../utils/commandLogger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removetimeout")
    .setDescription("Remove timeout")
    .addUserOption(o =>
      o.setName("user").setDescription("User").setRequired(true)
    ),

  async execute(interaction, client) {

    const member = interaction.options.getMember("user");

    await member.timeout(null).catch(() => {});

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("✅ Timeout Removed")
      .addFields({
        name: "Server",
        value: interaction.guild.name
      })
      .setTimestamp();

    member.send({ embeds: [embed] }).catch(() => {});

    log(client, interaction, `Removed timeout from ${member.user.tag}`);

    interaction.editReply("✅ Timeout removed");
  }
};