const fs = require("fs");
const file = "./data.json";

function load() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {

  // ✅ USERS
  addUser(id) {
    const d = load();
    if (!d.whitelist.includes(id)) {
      d.whitelist.push(id);
      save(d);
    }
  },
  removeUser(id) {
    const d = load();
    d.whitelist = d.whitelist.filter(x => x !== id);
    save(d);
  },
  isUser(id) {
    return load().whitelist.includes(id);
  },

  // ✅ ROLES
  addRole(gid, rid) {
    const d = load();
    if (!d.wl_roles[gid]) d.wl_roles[gid] = [];
    if (!d.wl_roles[gid].includes(rid)) {
      d.wl_roles[gid].push(rid);
      save(d);
    }
  },
  removeRole(gid, rid) {
    const d = load();
    if (!d.wl_roles[gid]) return;
    d.wl_roles[gid] = d.wl_roles[gid].filter(r => r !== rid);
    save(d);
  },
  isRole(gid, member) {
    const roles = load().wl_roles[gid] || [];
    return member.roles.cache.some(r => roles.includes(r.id));
  },

  // ✅ LOG CHANNELS
  setAudit(gid, cid) {
    const d = load();
    d.auditLogs[gid] = cid;
    save(d);
  },
  getAudit(gid) {
    return load().auditLogs[gid];
  },

  setMod(gid, cid) {
    const d = load();
    d.modLogs[gid] = cid;
    save(d);
  },
  getMod(gid) {
    return load().modLogs[gid];
  },

  // ✅ AI CHANNEL
  setAI(gid, cid) {
    const d = load();
    d.ai_channel[gid] = cid;
    save(d);
  },
  getAI(gid) {
    return load().ai_channel[gid];
  },

  // ✅ AI CUSTOM
  addAI(gid, q, a) {
    const d = load();
    d.ai_custom.push({ guildId: gid, question: q, answer: a });
    save(d);
  },
  listAI(gid) {
    return load().ai_custom.filter(x => x.guildId === gid);
  },
  removeAI(id) {
    const d = load();
    d.ai_custom.splice(id, 1);
    save(d);
  }
};