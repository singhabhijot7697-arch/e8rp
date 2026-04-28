const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inviteinfo")
    .setDescription("Get invite info")
    .addStringOption(o =>
      o.setName("code")
        .setDescription("Invite code")
        .setRequired(true)
    ),

  async execute(interaction) {

    const code = interaction.options.getString("code");

    const invite = await interaction.client.fetchInvite(code).catch(()=>null);

    if (!invite) return interaction.editReply("Invalid invite");

    interaction.channel.send(
      `Uses: ${invite.uses}\nCreator: ${invite.inviter?.tag}`
    );

    interaction.editReply("✅ Done");
  }
};