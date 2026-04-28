module.exports = {
  create(client) {
    client.db.run(`
      CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guildId TEXT,
        userId TEXT,
        action TEXT,
        reason TEXT,
        time INTEGER
      )
    `);
  },

  add(client, data) {
    return new Promise((res) => {
      client.db.run(
        `INSERT INTO cases VALUES (NULL,?,?,?,?,?)`,
        [data.guildId, data.userId, data.action, data.reason, Date.now()],
        function () {
          res(this.lastID);
        }
      );
    });
  },

  getUser(client, guildId, userId) {
    return new Promise((res) => {
      client.db.all(
        `SELECT * FROM cases WHERE guildId=? AND userId=?`,
        [guildId, userId],
        (e, rows) => res(rows || [])
      );
    });
  }
};