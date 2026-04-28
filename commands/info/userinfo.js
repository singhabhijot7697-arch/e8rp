const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function formatTime(timestamp) {
  return new Date(timestamp).toISOString().replace("T", " ").split(".")[0] + " UTC";
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get user info")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User")
    ),

  async execute(interaction) {

    const member = interaction.options.getMember("user") || interaction.member;
    const user = member.user;

    const roles = member.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => `<@&${r.id}>`)
      .join(" ") || "None";

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL()
      })
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Avatar", value: "[Click Here](" + user.displayAvatarURL() + ")" },
        { name: "Roles", value: roles },
        { name: "Created at", value: formatTime(user.createdTimestamp) },
        { name: "Joined at", value: formatTime(member.joinedTimestamp) }
      )
      .setFooter({ text: `ID: ${user.id}` });

    await interaction.channel.send({ embeds: [embed] });

    await interaction.editReply("✅ User info sent");
  }
};