const data = require("./aemter.json");
module.exports = async function () {
  const array = [];
  
  data.forEach((parent) => {
    parent.items.forEach((item) => {
      array.push({
        ...item,
        parent: {
          label: parent.label
        }
      });
    });
  });

  return array;
};