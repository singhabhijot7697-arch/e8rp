const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all commands with details"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Eight Streets RP - Help")
      .setDescription("Full list of commands and what they do")

      // ✅ MANAGEMENT
      .addFields({
        name: "Management",
        value:
`/say → Make the bot send a message in the channel  
/dm → Send a private message to a user  
/announce → Send a styled maintenance announcement with role ping  
/setbotstatus → Set rotating bot status (custom text supported)  
/setauditlogs → Set channel for system logs (joins, messages, etc.)  
/setmodlogs → Set channel for moderation logs`
      })

      // ✅ MODERATION
      .addFields({
        name: "Moderation",
        value:
`/ban → Permanently ban a user from server  
/unban → Unban user using ID  
/kick → Remove user from server  
/timeout → Temporarily mute user (supports time)  
/removetimeout → Remove timeout from user  
/mute → Quick timeout using time format (1h, 2d)  
/purge → Delete multiple messages at once  
/role → Add or remove a role from user  
/softban → Ban + unban (clears messages)`
      })

      // ✅ WARN SYSTEM
      .addFields({
        name: "Warn System",
        value:
`/warn → Warn user and store in database  
/warnings → View total warnings of a user  
/cases → View moderation history of user`
      })

      // ✅ AUTOMOD
      .addFields({
        name: "Auto Moderation",
        value:
`/automod_toggle → Enable or disable automod system  
/automod_addword → Add custom blocked word  
/automod_removeword → Remove blocked word  
/automod_list → View all blocked words`
      })

      // ✅ CHANNEL CONTROL
      .addFields({
        name: "Channel Control",
        value:
`/slowmode → Set slowmode delay for channel  
/lock → Lock channel (no messages allowed)  
/unlock → Unlock channel`
      })

      // ✅ INFO
      .addFields({
        name: "Information",
        value:
`/help → Show this help menu  
/avatar → Display user's avatar  
/userinfo → Detailed user info (roles, join date, etc.)  
/banner → Show user's banner  
/roles → List all roles of a user  
/inviteinfo → Show info about an invite`
      })

      // ✅ UTILITY
      .addFields({
        name: "Utility",
        value:
`/remind → Set reminder (example: 1h, 30m)  
/embed → Send custom embed message`
      })

      .setFooter({ text: "Eight Streets RP System" })
      .setTimestamp();

    // ✅ PUBLIC MESSAGE
    await interaction.channel.send({ embeds: [embed] });

    // ✅ PRIVATE CONFIRM
    await interaction.editReply("✅ Help sent");
  }
};