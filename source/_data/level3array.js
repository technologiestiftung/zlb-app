const scrapedData = require("./level3.json");
const manualData = require("./level3-manual.json");
const level2 = require("./level2.json");

const data = { ...scrapedData, ...manualData.additions };

/*
  Super hacky, but quick way of finding the parent group of each service.
  This works because we determine the structure of level2.json.
  Okay for now, but TODO: improve this!
*/
const services = [];
Object.entries(level2).forEach((item) => {
  const serviceGroup = {
    key: item[0],
    title: item[1].label,
    stringifiedChildren: JSON.stringify(item[1]),
  };
  services.push(serviceGroup);
});

module.exports = async function () {
  const array = [];
  Object.keys(data).forEach((key) => {
    const parentGroup = services.find((serviceGroup) => {
      return serviceGroup.stringifiedChildren.includes(key);
    });

    let appendedContent = manualData.appendix[key]
      ? manualData.appendix[key]
      : {};
    array.push({
      ...data[key],
      ...appendedContent,
      key,
      parent: { key: parentGroup.key, title: parentGroup.title },
    });
  });
  return array;
};
