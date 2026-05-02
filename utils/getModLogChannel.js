const data = require("./dataManager");

module.exports = (client, guildId) => {
  const id = data.getMod(guildId);
  return client.channels.cache.get(id);
};