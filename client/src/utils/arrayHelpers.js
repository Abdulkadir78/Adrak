const filterArray = (arr, field, toRemove) => {
  return arr.filter((item) => item[field] !== toRemove);
};

const isZerosArr = (arr) => {
  const match = arr.every((num) => num <= 0);
  return match;
};

const sortTasksByPriority = (arr, order = "LH") => {
  const lows = arr?.filter((task) => task.priority === "low");
  const mediums = arr?.filter((task) => task.priority === "medium");
  const highs = arr?.filter((task) => task.priority === "high");

  return order === "LH"
    ? [...lows, ...mediums, ...highs]
    : [...highs, ...mediums, ...lows];
};

export { filterArray, isZerosArr, sortTasksByPriority };
