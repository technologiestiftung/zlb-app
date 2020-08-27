const data = require("./level3.json");
const level2 = require("./level2.json");

/*
  Super hacky, but quick way of finding the parent group of each service.
  This works because we determine the structure of level2.json.
  Okay for now, but TODO: improve this!
*/
const services = [];
Object.entries(level2).forEach(item => {
  const serviceGroup = {
    title: item[0],
    stringifiedChildren: JSON.stringify(item[1])
  }
  services.push(serviceGroup);
})

module.exports = async function () {
  const array = [];
  Object.keys(data).forEach((key) => {
    const parentGroup = services.find(serviceGroup => {
      return serviceGroup.stringifiedChildren.includes(key);
    })
    array.push({ ...data[key], key, parent: parentGroup.title });
  });
  return array;
};