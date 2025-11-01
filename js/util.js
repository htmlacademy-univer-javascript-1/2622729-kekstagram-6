const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueIdGenerator = () => {
  const generatedIds = [];

  return () => {
    let newId;
    do {
      newId = getRandomInteger(1, 1000);
    } while (generatedIds.includes(newId));

    generatedIds.push(newId);
    return newId;
  };
};

export { getRandomInteger, createUniqueIdGenerator };
