const { SlashCommandBuilder } = require("discord.js");
const parseTime = require("../../utils/timeParser");
const formatTime = require("../../utils/formatTime");
const getModLogChannel = require("../../utils/getModLogChannel");
const createEmbed = require("../../utils/modEmbed");
const createDM = require("../../utils/modDM");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to timeout")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("time")
        .setDescription("Time (example: 1h, 2d 3h, 30m)")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("reason")
        .setDescription("Reason")
    ),

  async execute(interaction, client) {

    const member = interaction.options.getMember("user");
    const timeInput = interaction.options.getString("time");
    const reason = interaction.options.getString("reason") || "No reason given";

    const time = parseTime(timeInput);

    // ✅ INVALID TIME CHECK
    if (!time) {
      return interaction.editReply("❌ Invalid time format (use 1h, 2d 3h, 30m)");
    }

    // ✅ APPLY TIMEOUT
    await member.timeout(time, reason).catch(() => {
      return interaction.editReply("❌ Failed to timeout user");
    });

    // ✅ DM USER (EMBED)
    const dmEmbed = createDM(
      "Timeout",
      interaction.guild,
      interaction.user,
      reason,
      `Duration: ${formatTime(time)}`
    );

    member.send({ embeds: [dmEmbed] }).catch(() => {});

    // ✅ MOD LOG
    const logChannel = await getModLogChannel(client, interaction.guild.id);

    if (logChannel) {
      const embed = createEmbed(
        member.user,
        interaction.user,
        `${reason} (${formatTime(time)})`
      );

      logChannel.send({ embeds: [embed] });
    }

    // ✅ FINAL RESPONSE
    interaction.editReply(`✅ Timed out for ${formatTime(time)}`);
  }
};