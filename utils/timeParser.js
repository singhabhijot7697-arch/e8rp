module.exports = function parseTime(input) {
  if (!input) return null;

  input = input.toLowerCase();

  let total = 0;
  const regex = /(\d+)\s*(d|h|m|s)/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "d": total += value * 86400000; break;
      case "h": total += value * 3600000; break;
      case "m": total += value * 60000; break;
      case "s": total += value * 1000; break;
    }
  }

  return total || null;
};