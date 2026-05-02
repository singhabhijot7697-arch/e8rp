const data = require("./dataManager");

module.exports = (client, gid) => {
  const id = data.getAudit(gid);
  return id ? client.channels.cache.get(id) : null;
};