const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all commands"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setColor("#0f0f0f")
      .setTitle("Eight RolePlay - BOT")
      .setDescription("Complete command list with descriptions")

      .addFields(
        {
          name: "Management",
          value:
"```ansi\n" +
"/say           → Send message as bot\n" +
"/dm            → Send private message\n" +
"/announce      → Send announcement\n" +
"/setbotstatus  → Set rotating status\n" +
"/setauditlogs  → Set logs channel\n" +
"/setmodlogs    → Set mod logs\n" +
"```"
        },
        {
          name: "Moderation",
          value:
"```ansi\n" +
"/ban            → Ban a user\n" +
"/kick           → Kick a user\n" +
"/timeout        → Timeout user (1h, 2d etc)\n" +
"/removetimeout  → Remove timeout\n" +
"/purge          → Delete messages\n" +
"/role           → Add/remove role\n" +
"/warn           → Warn user\n" +
"/warnings       → Check warnings\n" +
"```"
        },
        {
          name: "Whitelist",
          value:
"```ansi\n" +
"/wl         → Add whitelist user\n" +
"/rwl        → Remove whitelist user\n" +
"/wlrole     → Add role whitelist\n" +
"/unwlrole   → Remove role whitelist\n" +
"```"
        },
        {
          name: "AI System",
          value:
"```ansi\n" +
"/ai          → Enable/disable AI channel\n" +
"/add_ai      → Add AI question\n" +
"/remove_ai   → Remove AI question\n" +
"/list_ai     → View AI data\n" +
"/edit_ai     → Edit AI entry\n" +
"```"
        },
        {
          name: "Utility",
          value:
"```ansi\n" +
"/avatar      → Show avatar\n" +
"/userinfo    → Show user info\n" +
"/banner      → Show banner\n" +
"/roles       → Show roles\n" +
"/inviteinfo  → Invite details\n" +
"/remind      → Set reminder\n" +
"```"
        }
      )

      .setFooter({ text: "Eight RP • System" })
      .setTimestamp();

    // ✅ SEND IN CHAT
    await interaction.channel.send({ embeds: [embed] });

    // ✅ PRIVATE CONFIRM
    await interaction.editReply("✅ Help sent");
  }
};