// ✅ normalize text
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ✅ simple fuzzy match
function includesAny(content, keywords) {
  return keywords.some(k => content.includes(k));
}

// ✅ typo tolerance (basic)
function fuzzyMatch(content, keywords) {
  return keywords.some(k => {
    const short = k.replace(/\s/g, "");
    return content.includes(k) || content.includes(short);
  });
}

module.exports = { normalize, includesAny, fuzzyMatch };