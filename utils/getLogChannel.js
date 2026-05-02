const data = require("./dataManager");

module.exports = (client, guildId) => {
  const id = data.getAudit(guildId);
  return client.channels.cache.get(id);
};