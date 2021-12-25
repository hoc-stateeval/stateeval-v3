const convertArrayToHashMap = (arr, key = 'id') => {
  return arr.reduce((map, obj) => {
    map[obj[key]] = obj;
    return map;
  }, {});
};

export { convertArrayToHashMap };
