const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get user avatar")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
    ),

  async execute(interaction) {

    const user = interaction.options.getUser("user") || interaction.user;

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setAuthor({
        name: `${user.username} - Avatar`,
        iconURL: user.displayAvatarURL()
      })
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setFooter({ text: `ID: ${user.id}` });

    await interaction.channel.send({ embeds: [embed] });

    await interaction.editReply("✅ Avatar sent");
  }
};