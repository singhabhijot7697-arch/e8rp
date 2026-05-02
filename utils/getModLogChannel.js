const data = require("./dataManager");

module.exports = (client, gid) => {
  const id = data.getMod(gid);
  return id ? client.channels.cache.get(id) : null;
};