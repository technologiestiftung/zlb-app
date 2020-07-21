const data = require("./level3.json");
module.exports = async function () {
  const array = [];
  Object.keys(data).forEach((key) => {
    array.push({ ...data[key], key });
  });
  return array;
};