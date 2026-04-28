module.exports = function formatModLog(user, moderator, reason) {

  return (
`Offender: ${user.username} <@${user.id}>
Reason: ${reason || "No reason given"}
Responsible moderator: ${moderator.tag}
ID: ${user.id} • ${new Date().toLocaleString()}`
  );

};