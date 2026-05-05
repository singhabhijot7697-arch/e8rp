const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data.json");

// ✅ DEFAULT STRUCTURE
const defaultData = {
  whitelist: [],
  wl_roles: {},
  auditLogs: {},
  modLogs: {},
  automod_words: {},
  ai_channel: {},
  ai_custom: []
};

// ✅ LOAD DATA (SAFE)
function load() {
  try {
    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);

    // ✅ ensure all keys exist
    return { ...defaultData, ...data };

  } catch (err) {
    console.log("⚠️ Creating new data.json");
    save(defaultData);
    return defaultData;
  }
}

// ✅ SAVE DATA
function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {

  // ======================
  // ✅ USER WHITELIST
  // ======================
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

  getUsers() {
    return load().whitelist;
  },

  // ======================
  // ✅ ROLE WHITELIST
  // ======================
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

    d.wl_roles[gid] =
      d.wl_roles[gid].filter(r => r !== rid);

    save(d);
  },

  isRole(gid, member) {
    const roles = load().wl_roles[gid] || [];
    return member.roles.cache.some(r => roles.includes(r.id));
  },

  getRoles(gid) {
    return load().wl_roles[gid] || [];
  },

  // ======================
  // ✅ AUDIT LOG CHANNEL
  // ======================
  setAudit(gid, cid) {
    const d = load();

    if (!d.auditLogs) d.auditLogs = {}; // ✅ FIX

    d.auditLogs[gid] = cid;
    save(d);
  },

  getAudit(gid) {
    return load().auditLogs?.[gid];
  },

  // ======================
  // ✅ MOD LOG CHANNEL
  // ======================
  setMod(gid, cid) {
    const d = load();

    if (!d.modLogs) d.modLogs = {}; // ✅ FIX

    d.modLogs[gid] = cid;
    save(d);
  },

  getMod(gid) {
    return load().modLogs?.[gid];
  },

  // ======================
  // ✅ AUTOMOD WORDS
  // ======================
  addWord(gid, word) {
    const d = load();

    if (!d.automod_words[gid]) d.automod_words[gid] = [];

    if (!d.automod_words[gid].includes(word)) {
      d.automod_words[gid].push(word);
      save(d);
    }
  },

  removeWord(gid, word) {
    const d = load();

    if (!d.automod_words[gid]) return;

    d.automod_words[gid] =
      d.automod_words[gid].filter(w => w !== word);

    save(d);
  },

  getWords(gid) {
    return load().automod_words[gid] || [];
  },

  // ======================
  // ✅ AI SYSTEM
  // ======================
  setAI(gid, cid) {
    const d = load();
    d.ai_channel[gid] = cid;
    save(d);
  },

  getAI(gid) {
    return load().ai_channel[gid];
  },

  addAI(gid, q, a) {
    const d = load();
    d.ai_custom.push({ guildId: gid, question: q, answer: a });
    save(d);
  },

  listAI(gid) {
    return load().ai_custom.filter(x => x.guildId === gid);
  },

  removeAI(index) {
    const d = load();
    d.ai_custom.splice(index, 1);
    save(d);
  }

};