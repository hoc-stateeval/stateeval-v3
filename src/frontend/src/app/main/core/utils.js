const convertArrayToHashMap = (arr) => {
  return arr.reduce((map, obj) => {
    map[obj.id] = obj;
    return map;
  }, {});
};

export { convertArrayToHashMap };
