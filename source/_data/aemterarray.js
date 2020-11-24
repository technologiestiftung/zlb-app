const dataScraped = require("./aemter.json");
const dataManual = require("./aemter-manual.json");

module.exports = async function () {
  const array = [];

  dataScraped.forEach((parent) => {
    parent.items.forEach((item) => {
      array.push({
        ...item,
        details: {
          ...item.details,
          ...dataManual[item.id],
        },
        parent: {
          label: parent.label,
        },
      });
    });
  });

  return array;
};
