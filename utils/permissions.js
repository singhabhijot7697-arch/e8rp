require("dotenv").config();
const data = require("./dataManager");

const owners = [
  process.env.OWNER_ID_1,
  process.env.OWNER_ID_2,
  process.env.OWNER_ID_3
];

async function canUse(client, interaction) {
  if (owners.includes(interaction.user.id)) return true;
  if (data.isUser(interaction.user.id)) return true;
  if (data.isRole(interaction.guild.id, interaction.member)) return true;
  return false;
}

module.exports = { canUse };