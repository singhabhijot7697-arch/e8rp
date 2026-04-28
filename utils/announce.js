const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("an")
    .setDescription("Announcement")
    .addStringOption(o => o.setName("date").setRequired(true))
    .addStringOption(o => o.setName("servers").setRequired(true))
    .addStringOption(o => o.setName("infra"))
    .addStringOption(o => o.setName("infra_emoji"))
    .addStringOption(o => o.setName("emoji1"))
    .addStringOption(o => o.setName("emoji2"))
    .addAttachmentOption(o => o.setName("image")),

  async execute(interaction, client, canUse) {

    if (!(await canUse(client, interaction))) {
      return interaction.editReply("❌ Not allowed");
    }

    const date = interaction.options.getString("date");
    const servers = interaction.options.getString("servers");

    const infra = interaction.options.getString("infra") || "Infrastructure";
    const infraEmoji = interaction.options.getString("infra_emoji") || "⚠️";

    const e1 = interaction.options.getString("emoji1") || "📅";
    const e2 = interaction.options.getString("emoji2") || "🖥️";

    const image = interaction.options.getAttachment("image");

    const embed = new EmbedBuilder()
      .setColor("#0066ff")
      .setTitle(`${infraEmoji} ${infra} Maintenance`)
      .setDescription(
        `Scheduled maintenance will be carried out on the hosting side. During this time, brief interruptions in service and network timeouts may occur.\n\n` +
        `${e1} **Maintenance Date**\n${date}\n\n` +
        `${e2} **Affected Servers**\n${servers}`
      )
      .setFooter({ text: "Thanks for your understanding!" })
      .setTimestamp();

    if (image) embed.setThumbnail(image.url);

    await interaction.channel.send({
      content: "@everyone",
      embeds: [embed]
    });

    interaction.editReply("✅ Sent");
  }
};