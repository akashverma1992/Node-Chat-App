var generateMessage = (from, text, date) => {
  return {
    from,
    text,
    date
  };
};

module.exports = {
  generateMessage
}