const data = require("./help.json");
module.exports = async function () {
  const array = [];
  Object.keys(data).forEach((key) => {
    array.push({ items: data[key], key });
  });
  return array;
};