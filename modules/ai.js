const generateVariants = require("../utils/generateVariants");

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function similarity(a, b) {
  const wordsA = a.split(" ");
  const wordsB = b.split(" ");

  let match = 0;
  wordsA.forEach(w => {
    if (wordsB.includes(w)) match++;
  });

  return match / Math.max(wordsA.length, wordsB.length);
}

module.exports = (client) => {

client.on("messageCreate", async (msg) => {
  if (!msg.guild || msg.author.bot) return;

  client.db.get(
    `SELECT channelId FROM ai_channel WHERE guildId=?`,
    [msg.guild.id],
    async (err, row) => {

      if (!row) return;
      if (msg.channel.id !== row.channelId) return;
      if (!msg.mentions.has(client.user.id)) return;

      const content = normalize(msg.content);

      client.db.all(
        `SELECT rowid, question, answer FROM ai_custom WHERE guildId=?`,
        [msg.guild.id],
        async (err, rows) => {

          let bestMatch = null;
          let bestScore = 0;

          if (rows && rows.length) {

            for (const r of rows) {

              const variants = generateVariants(r.question);

              for (const v of variants) {
                const score = similarity(content, normalize(v));

                if (score > bestScore) {
                  bestScore = score;
                  bestMatch = r;
                }
              }
            }
          }

          // ✅ MATCH FOUND
          if (bestMatch && bestScore > 0.4) {

            // ✅ LEARNING SYSTEM (save user input)
            client.db.run(
              `INSERT INTO ai_learning VALUES (?, ?, ?)`,
              [msg.guild.id, content, bestMatch.question]
            );

            await msg.channel.sendTyping();
            await new Promise(r => setTimeout(r, 1000));

            return msg.reply(bestMatch.answer);
          }

          // ✅ FALLBACK
          msg.reply(
            "I'm unable to assist with that at the moment. This feature is still under development."
          );

        }
      );

    }
  );

});
};