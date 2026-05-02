const getLogChannel = require("../utils/getLogChannel");

// ✅ LINK (allow gifs)
const linkRegex = /(https?:\/\/|discord\.gg\/)/i;
const gifRegex = /(tenor\.com|giphy\.com|\.gif)/i;

// ✅ ABUSE WORDS (EN + HINDI)
const badWords = [
  "fuck","bitch","shit","asshole","bastard","dick","cunt","mf","motherfucker",
  "madarchod","bhenchod","chutiya","gandu","lund","randi","harami","bc","mc"
];

// ✅ WHITELIST ROLE CHECK
async function isWhitelisted(client, member) {
  return new Promise((resolve) => {
    client.db.all(
      `SELECT roleId FROM wl_roles WHERE guildId=?`,
      [member.guild.id],
      (err, rows) => {
        if (!rows) return resolve(false);
        const roleIds = rows.map(r => r.roleId);
        resolve(member.roles.cache.some(r => roleIds.includes(r.id)));
      }
    );
  });
}

// ✅ STRIKE SYSTEM (per guild/user/type)
async function addStrike(client, guildId, userId, type) {
  return new Promise((resolve) => {
    client.db.get(
      `SELECT count FROM automod WHERE guildId=? AND userId=? AND type=?`,
      [guildId, userId, type],
      (err, row) => {
        const count = row ? row.count + 1 : 1;

        client.db.run(
          `INSERT OR REPLACE INTO automod VALUES (?, ?, ?, ?)`,
          [guildId, userId, type, count]
        );

        resolve(count);
      }
    );
  });
}

// ✅ DURATION (escalation)
function getDuration(type, count) {
  if (type === "link") return 5 * 60 * 60 * 1000; // 5h

  if (type === "abuse") {
    if (count === 1) return 2 * 60 * 60 * 1000;   // 2h
    if (count === 2) return 24 * 60 * 60 * 1000;  // 24h
    return 7 * 24 * 60 * 60 * 1000;               // 7d
  }
}

// ✅ HUMAN TIME
function formatTime(ms) {
  const s = Math.floor(ms/1000);
  const m = Math.floor(s/60);
  const h = Math.floor(m/60);
  const d = Math.floor(h/24);

  if (d > 0) return `${d}d ${h%24}h`;
  if (h > 0) return `${h}h ${m%60}m`;
  if (m > 0) return `${m}m ${s%60}s`;
  return `${s}s`;
}

module.exports = (client) => {

client.on("messageCreate", async (msg) => {
  if (!msg.guild || msg.author.bot) return;

  const member = msg.member;
  const content = msg.content.toLowerCase().trim();

  // ✅ ignore empty/emoji-only/gif-only
  if (!content || content.length < 3) return;
  if (/^[\p{Emoji}\s]+$/u.test(content)) return;
  if (gifRegex.test(content)) return;

  // ✅ whitelist bypass
  if (await isWhitelisted(client, member)) return;

  const logCh = await getLogChannel(client, msg.guild.id);

  // =======================
  // 🚫 LINK
  // =======================
  if (linkRegex.test(content)) {

    await msg.delete().catch(()=>{});

    const duration = getDuration("link", 1);
    await member.timeout(duration).catch(()=>{});

    // DM
    member.send({
      embeds: [{
        color: 0xED4245,
        title: "Moderation Action: Timeout",
        description:
`Server: ${msg.guild.name}
Reason: Link detected
Duration: ${formatTime(duration)}`
      }]
    }).catch(()=>{});

    // log
    if (logCh) {
      logCh.send({
        embeds: [{
          color: 0x5865F2,
          description:
`**AutoMod Triggered**
User: ${msg.author.username}
Reason: Link detected

ID: ${msg.author.id} • ${new Date().toLocaleString()}`
        }]
      });
    }

    return;
  }

  // =======================
  // 🤬 ABUSE
  // =======================
  if (badWords.some(w => content.includes(w))) {

    await msg.delete().catch(()=>{});

    const count = await addStrike(client, msg.guild.id, msg.author.id, "abuse");
    const duration = getDuration("abuse", count);

    await member.timeout(duration).catch(()=>{});

    // DM
    member.send({
      embeds: [{
        color: 0xED4245,
        title: "Moderation Action: Timeout",
        description:
`Server: ${msg.guild.name}
Reason: Abusive language
Duration: ${formatTime(duration)}`
      }]
    }).catch(()=>{});

    // log
    if (logCh) {
      logCh.send({
        embeds: [{
          color: 0x5865F2,
          description:
`**AutoMod Triggered**
User: ${msg.author.username}
Reason: Abusive language (${formatTime(duration)})

ID: ${msg.author.id} • ${new Date().toLocaleString()}`
        }]
      });
    }

    return;
  }

});

};