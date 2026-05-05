const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const data = require("../../utils/dataManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlist")
    .setDescription("View whitelist users and roles"),

  async execute(interaction) {

    const guildId = interaction.guild.id;

    const users = data.getUsers();
    const roles = data.getRoles(guildId);

    // ✅ FORMAT USERS
    const userList = users.length
      ? users.map(id => `<@${id}>`).join("\n")
      : "None";

    // ✅ FORMAT ROLES
    const roleList = roles.length
      ? roles.map(id => `<@&${id}>`).join("\n")
      : "None";

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Whitelist System")
      .addFields(
        { name: "Users", value: userList },
        { name: "Roles", value: roleList }
      )
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply("✅ Sent");
  }
};