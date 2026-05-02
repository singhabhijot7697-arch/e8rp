module.exports = function generateVariants(question) {

  question = question.toLowerCase();

  return [
    question,
    question.replace("what is", ""),
    question.replace("who is", ""),
    question.replace("how to", ""),
    question.replace("explain", ""),
    question.replace("tell me", ""),
    question.replace("about", ""),
  ].map(q => q.trim()).filter(q => q.length > 2);
};