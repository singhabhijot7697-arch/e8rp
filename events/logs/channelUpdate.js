const { EmbedBuilder } = require("discord.js");
const getLogChannel = require("../../utils/getLogChannel");

module.exports = {
  name: "channelUpdate",

  async execute(oldCh, newCh, client) {

    const ch = await getLogChannel(client, newCh.guild.id);
    if (!ch) return;

    let changes = [];

    newCh.permissionOverwrites.cache.forEach((newPerm, id) => {
      const oldPerm = oldCh.permissionOverwrites.cache.get(id);
      if (!oldPerm) return;

      const added = newPerm.allow.toArray().filter(p => !oldPerm.allow.has(p));
      const removed = newPerm.deny.toArray().filter(p => !oldPerm.deny.has(p));

      if (added.length || removed.length) {

        let roleMention = `<@&${id}>`; // ✅ FIX

        let text = `Overwrites for ${roleMention} in <#${newCh.id}> updated\n\n`;

        added.forEach(p => {
          text += `**${p}:** ⬜ ➜ ✅\n`;
        });

        removed.forEach(p => {
          text += `**${p}:** ✅ ➜ ❌\n`;
        });

        changes.push(text);
      }
    });

    if (!changes.length) return;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setDescription(
        `**Text channel updated**\n\n${changes.join("\n")}\n` +
        `Channel ID: ${newCh.id} • ${new Date().toLocaleString()}`
      );

    ch.send({ embeds: [embed] });
  }
};