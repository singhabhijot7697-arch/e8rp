const getLogChannel = require("../utils/getLogChannel");

// ✅ LINK + GIF
const linkRegex = /(https?:\/\/|discord\.gg\/)/i;
const gifRegex = /(tenor\.com|giphy\.com|\.gif)/i;

// ✅ ABUSE WORDS (EN + HINDI)
const badWords = [
  "fuck","bitch","shit","asshole","bastard","dick","cunt","mf","motherfucker",
  "madarchod","bhenchod","chutiya","gandu","lund","randi","harami","bc","mc"
];

// ✅ CHECK ROLE WHITELIST
async function isWhitelisted(client, member) {
  return new Promise((resolve) => {
    client.db.all(
      `SELECT roleId FROM wl_roles WHERE guildId=?`,
      [member.guild.id],
      (err, rows) => {
        if (!rows) return resolve(false);

        const roleIds = rows.map(r => r.roleId);
        const has = member.roles.cache.some(r => roleIds.includes(r.id));

        resolve(has);
      }
    );
  });
}

// ✅ STRIKE SYSTEM
async function addStrike(client, guildId, userId, type) {
  return new Promise((resolve) => {
    client.db.get(
      `SELECT count FROM automod WHERE guildId=? AND userId=? AND type=?`,
      [guildId, userId, type],
      (err, row) => {

        let count = row ? row.count + 1 : 1;

        client.db.run(
          `INSERT OR REPLACE INTO automod VALUES (?, ?, ?, ?)`,
          [guildId, userId, type, count]
        );

        resolve(count);
      }
    );
  });
}

// ✅ TIME LOGIC
function getDuration(type, count) {

  if (type === "link") return 5 * 60 * 60 * 1000;

  if (type === "abuse") {
    if (count === 1) return 2 * 60 * 60 * 1000;
    if (count === 2) return 24 * 60 * 60 * 1000;
    return 7 * 24 * 60 * 60 * 1000;
  }
}

// ✅ FORMAT TIME
function formatTime(ms) {
  const h = Math.floor(ms / 3600000);
  const d = Math.floor(h / 24);

  if (d > 0) return `${d}d ${h % 24}h`;
  return `${h}h`;
}

module.exports = (client) => {

client.on("messageCreate", async (msg) => {
  if (!msg.guild || msg.author.bot) return;

  const member = msg.member;
  const content = msg.content.toLowerCase();

  // ✅ WHITELIST BYPASS
  if (await isWhitelisted(client, member)) return;

  const logCh = await getLogChannel(client, msg.guild.id);

  // ======================
  // 🚫 LINK BLOCK (ALLOW GIF)
  // ======================
  if (linkRegex.test(content)) {

    if (gifRegex.test(content)) return; // ✅ allow gifs

    await msg.delete().catch(() => {});

    const duration = getDuration("link", 1);

    await member.timeout(duration).catch(() => {});

    // ✅ DM USER
    member.send(
`🚫 You were timed out for sending a link
Server: ${msg.guild.name}
Duration: ${formatTime(duration)}`
    ).catch(() => {});

    // ✅ LOG
    if (logCh) {
      logCh.send(`🚫 AutoMod: ${msg.author.tag} sent a blocked link`);
    }

    return;
  }

  // ======================
  // 🤬 ABUSE FILTER
  // ======================
  if (badWords.some(w => content.includes(w))) {

    await msg.delete().catch(() => {});

    const count = await addStrike(client, msg.guild.id, msg.author.id, "abuse");
    const duration = getDuration("abuse", count);

    await member.timeout(duration).catch(() => {});

    let durationText =
      count === 1 ? "2h" :
      count === 2 ? "24h" : "7d";

    // ✅ DM USER
    member.send(
`🚫 You were timed out for abusive language
Server: ${msg.guild.name}
Duration: ${durationText}`
    ).catch(() => {});

    // ✅ LOG
    if (logCh) {
      logCh.send(`🚫 AutoMod: ${msg.author.tag} used abusive language (${durationText})`);
    }

    return;
  }

});

};