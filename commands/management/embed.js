const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function splitText(text, maxLength = 4000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create a custom embed')
    
    .addStringOption(option =>
      option.setName('title').setDescription('Embed title')
    )
    
    .addStringOption(option =>
      option.setName('description').setDescription('Embed description')
    )

    .addStringOption(option =>
      option.setName('color').setDescription('Hex color (#5865F2)')
    )

    .addStringOption(option =>
      option.setName('image').setDescription('Image URL')
    )

    .addStringOption(option =>
      option.setName('thumbnail').setDescription('Thumbnail URL')
    ),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description') || '';
    const colorInput = interaction.options.getString('color');
    const image = interaction.options.getString('image');
    const thumbnail = interaction.options.getString('thumbnail');

    let color = 0x5865F2;
    if (colorInput) {
      const clean = colorInput.replace('#', '');
      color = parseInt(clean, 16);
    }

    const parts = splitText(description);

    const embeds = parts.map((part, index) => {
      const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(part);

      if (title && index === 0) embed.setTitle(title);
      if (image && index === parts.length - 1) embed.setImage(image);
      if (thumbnail && index === 0) embed.setThumbnail(thumbnail);

      return embed;
    });

    await interaction.channel.send({ embeds });

    await interaction.reply({
      content: 'Embed sent ✅',
      ephemeral: true
    });
  }
};