module.exports = function (client, guildId) {
  return new Promise((resolve) => {
    client.db.get(
      `SELECT channelId FROM modlogs WHERE guildId=?`,
      [guildId],
      (err, row) => {
        if (!row) return resolve(null);
        resolve(client.channels.cache.get(row.channelId));
      }
    );
  });
};