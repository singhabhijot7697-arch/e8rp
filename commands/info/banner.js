const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banner")
    .setDescription("Get user banner")
    .addUserOption(o =>
      o.setName("user")
        .setDescription("User to check")
    ),

  async execute(interaction, client) {

    const user = interaction.options.getUser("user") || interaction.user;
    const fetched = await client.users.fetch(user.id, { force: true });

    interaction.channel.send(fetched.bannerURL() || "No banner");
    interaction.editReply("✅ Sent");
  }
};