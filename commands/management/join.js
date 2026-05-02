const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Bot joins your voice channel"),

  async execute(interaction) {

    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.editReply("❌ You must be in a voice channel");
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    await interaction.editReply("✅ Joined voice channel");
  }
};