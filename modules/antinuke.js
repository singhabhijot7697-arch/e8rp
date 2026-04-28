const getLogChannel = require("../utils/getLogChannel");

module.exports = (client) => {

const actions = new Map();

function track(guildId, userId) {
  const key = guildId + userId;
  const now = Date.now();

  if (!actions.has(key)) actions.set(key, []);
  const arr = actions.get(key).filter(t => now - t < 10000);

  arr.push(now);
  actions.set(key, arr);

  return arr.length;
}

client.on("channelDelete", async (channel) => {
  const logs = await channel.guild.fetchAuditLogs({ limit: 1 });
  const entry = logs.entries.first();
  if (!entry) return;

  const count = track(channel.guild.id, entry.executor.id);

  if (count >= 3) {
    const member = await channel.guild.members.fetch(entry.executor.id);
    await member.timeout(24 * 60 * 60 * 1000).catch(() => {});

    const ch = await getLogChannel(client, channel.guild.id);
    if (ch) {
      ch.send(`🚨 Anti-Nuke: ${member.user.tag} punished`);
    }
  }
});

};