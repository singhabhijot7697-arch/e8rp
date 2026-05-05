const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all commands"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Eight RolePlay - BOT")
      .setDescription("Here are all available commands:")

      .addFields(

        {
          name: "Management",
          value:
"/say — Send message as bot\n" +
"/dm — Send private message\n" +
"/announce — Send announcement\n" +
"/setbotstatus — Set bot status\n" +
"/setauditlogs — Set logs channel\n" +
"/setmodlogs — Set mod logs"
        },

        {
          name: "Moderation",
          value:
"/ban — Ban user\n" +
"/kick — Kick user\n" +
"/timeout — Timeout user\n" +
"/removetimeout — Remove timeout\n" +
"/purge — Delete messages\n" +
"/role — Manage roles\n" +
"/warn — Warn user\n" +
"/warnings — Check warnings"
        },

        {
          name: "Whitelist",
          value:
"/wl — Add whitelist user\n" +
"/rwl — Remove whitelist user\n" +
"/wlrole — Add role whitelist\n" +
"/unwlrole — Remove role whitelist\n" +
"/wlist — View whitelist"
        },

        {
          name: "Utility",
          value:
"/avatar — Show avatar\n" +
"/userinfo — Show user info\n" +
"/banner — Show banner\n" +
"/roles — Show roles\n" +
"/inviteinfo — Invite details\n" +
"/remind — Set reminder"
        }

      )

      .setFooter({ text: "Eight RP System" })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply("✅ Help sent");
  }
};