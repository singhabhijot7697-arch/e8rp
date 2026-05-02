require("dotenv").config();
const data = require("./dataManager");

const owners = [
  process.env.OWNER_ID_1,
  process.env.OWNER_ID_2,
  process.env.OWNER_ID_3
];

async function canUse(client, interaction) {

  const userId = interaction.user.id;

  // ✅ OWNER ALWAYS ALLOWED
  if (owners.includes(userId)) return true;

  // ✅ USER WHITELIST
  if (data.isUser(userId)) return true;

  // ✅ ROLE WHITELIST
  if (data.isRole(interaction.guild.id, interaction.member)) return true;

  return false;
}

module.exports = { canUse };