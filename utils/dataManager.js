const fs = require("fs");

const file = "./data.json";

function load() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {

  // ✅ USER WL
  addUser(userId) {
    const data = load();
    if (!data.whitelist.includes(userId)) {
      data.whitelist.push(userId);
      save(data);
    }
  },

  removeUser(userId) {
    const data = load();
    data.whitelist = data.whitelist.filter(id => id !== userId);
    save(data);
  },

  isUser(userId) {
    const data = load();
    return data.whitelist.includes(userId);
  },

  // ✅ ROLE WL
  addRole(guildId, roleId) {
    const data = load();
    if (!data.wl_roles[guildId]) data.wl_roles[guildId] = [];

    if (!data.wl_roles[guildId].includes(roleId)) {
      data.wl_roles[guildId].push(roleId);
      save(data);
    }
  },

  removeRole(guildId, roleId) {
    const data = load();
    if (!data.wl_roles[guildId]) return;

    data.wl_roles[guildId] =
      data.wl_roles[guildId].filter(r => r !== roleId);

    save(data);
  },

  isRole(guildId, member) {
    const data = load();
    const roles = data.wl_roles[guildId] || [];

    return member.roles.cache.some(r => roles.includes(r.id));
  },

  // ✅ AUDIT LOG
  setAudit(guildId, channelId) {
    const data = load();
    data.auditLogs[guildId] = channelId;
    save(data);
  },

  getAudit(guildId) {
    const data = load();
    return data.auditLogs[guildId];
  },

  // ✅ MOD LOG
  setMod(guildId, channelId) {
    const data = load();
    data.modLogs[guildId] = channelId;
    save(data);
  },

  getMod(guildId) {
    const data = load();
    return data.modLogs[guildId];
  }

};