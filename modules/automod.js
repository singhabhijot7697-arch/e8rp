const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../utils/getLogChannel");
const data = require("../utils/dataManager");

// ✅ TIME FORMAT
function formatTime(ms) {
  const h = Math.floor(ms / 3600000);
  const d = Math.floor(h / 24);

  if (d > 0) return `${d}d ${h % 24}h`;
  return `${h}h`;
}

module.exports = (client) => {

client.on("messageCreate", async (msg) => {

  if (!msg.guild || msg.author.bot) return;

  const content = msg.content.toLowerCase().trim();

  // ✅ IGNORE EMOJIS / GIFS
  if (!content || content.length < 3) return;
  if (/^[\p{Emoji}\s]+$/u.test(content)) return;
  if (/(tenor|giphy|\.gif)/i.test(content)) return;

  const logCh = await getLogChannel(client, msg.guild.id);

  // ✅ GET CUSTOM WORDS
  const customWords = data.getWords(msg.guild.id);

  // ✅ DEFAULT + CUSTOM WORDS
  const badWords = [
    "fuck","bitch","shit","madarchod","bhenchod","chutiya","gandu",
    ...customWords
  ];

  // ======================
  // 🚫 LINK DETECTION
  // ======================
  if (/(https?:\/\/|discord\.gg)/i.test(content)) {

    const duration = 5 * 60 * 60 * 1000;

    await msg.delete().catch(()=>{});
    await msg.member.timeout(duration).catch(()=>{});

    // ✅ DM USER
    msg.author.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0xED4245)
          .setTitle("Moderation Action: Timeout")
          .setDescription(
`Server: ${msg.guild.name}
Reason: Sending links
Duration: ${formatTime(duration)}`
          )
      ]
    }).catch(()=>{});

    // ✅ LOG
    if (logCh) {
      logCh.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({
              name: msg.author.username,
              iconURL: msg.author.displayAvatarURL()
            })
            .setDescription(
`**AutoMod Triggered**
User: <@${msg.author.id}>
Reason: Sending links

Action: Timeout (${formatTime(duration)})

ID: ${msg.author.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    return;
  }

  // ======================
  // 🤬 ABUSE DETECTION
  // ======================
  if (badWords.some(w => content.includes(w))) {

    const duration = 24 * 60 * 60 * 1000;

    await msg.delete().catch(()=>{});
    await msg.member.timeout(duration).catch(()=>{});

    // ✅ DM USER
    msg.author.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0xED4245)
          .setTitle("Moderation Action: Timeout")
          .setDescription(
`**Server:** ${msg.guild.name}
**Reason:** Abusive language
**Duration:** ${formatTime(duration)}`
          )
      ]
    }).catch(()=>{});

    // ✅ LOG
    if (logCh) {
      logCh.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x5865F2)
            .setAuthor({
              name: msg.author.username,
              iconURL: msg.author.displayAvatarURL()
            })
            .setDescription(
`**AutoMod Triggered**

**User:** <@${msg.author.id}>
**Reason:** Abusive language

**Action:** Timeout (${formatTime(duration)})

ID: ${msg.author.id} • ${new Date().toLocaleString()}`
            )
        ]
      });
    }

    return;
  }

});
};