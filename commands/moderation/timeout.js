const { SlashCommandBuilder } = require("discord.js");
const parseTime = require("../../utils/timeParser");
const formatTime = require("../../utils/formatTime");
const getModLogChannel = require("../../utils/getModLogChannel");
const createEmbed = require("../../utils/modEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout user")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
        .setRequired(true)
    )
    .addStringOption(o =>
      o.setName("time")
        .setDescription("Time (example: 1h, 30m, 2d)")
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

    if (!time) {
      return interaction.editReply("❌ Invalid time format (use 1h, 30m, etc)");
    }

    await member.timeout(time).catch(()=>{});

    // ✅ DM USER
    member.send(
`You have been timed out
Server: ${interaction.guild.name}
Duration: ${formatTime(time)}
Reason: ${reason}`
    ).catch(()=>{});

    // ✅ MOD LOG
    const ch = await getModLogChannel(client, interaction.guild.id);

    if (ch) {
      const embed = createEmbed(
        member.user,
        interaction.user,
        `${reason} (${formatTime(time)})`
      );

      ch.send({ embeds: [embed] });
    }

    interaction.editReply(`✅ Timed out for ${formatTime(time)}`);
  }
};