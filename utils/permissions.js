require("dotenv").config();

const owners = [
  process.env.OWNER_ID_1,
  process.env.OWNER_ID_2,
  process.env.OWNER_ID_3
];

// ✅ CHECK USER WHITELIST
function isWhitelistedUser(client, userId) {
  return new Promise((resolve) => {
    client.db.get(
      `SELECT userId FROM whitelist WHERE userId=?`,
      [userId],
      (err, row) => {
        resolve(!!row);
      }
    );
  });
}

// ✅ CHECK ROLE WHITELIST
function isWhitelistedRole(client, member) {
  return new Promise((resolve) => {
    client.db.all(
      `SELECT roleId FROM wl_roles WHERE guildId=?`,
      [member.guild.id],
      (err, rows) => {
        if (!rows) return resolve(false);

        const roleIds = rows.map(r => r.roleId);

        const hasRole = member.roles.cache.some(r =>
          roleIds.includes(r.id)
        );

        resolve(hasRole);
      }
    );
  });
}

// ✅ MAIN CHECK
async function canUse(client, interaction) {

  // ✅ OWNER ALWAYS ALLOWED
  if (owners.includes(interaction.user.id)) return true;

  // ✅ USER WHITELIST
  if (await isWhitelistedUser(client, interaction.user.id)) return true;

  // ✅ ROLE WHITELIST
  if (await isWhitelistedRole(client, interaction.member)) return true;

  return false;
}

module.exports = { canUse };