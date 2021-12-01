const randomPicker = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

module.exports = randomPicker;
