const data = require("./aemter.json");

module.exports = async function () {
  const array = [];

  data.forEach((bezirksamt) => {
    bezirksamt.items.forEach((buergeramt) => {
      const availableServices = buergeramt.details.services.filter(
        (service) => {
          return service.id && service.appointment === true;
        }
      );
      const servicesWithOfficeId = availableServices.map((service) => {
        return {
          key: service.id,
          officeId: buergeramt.id,
          serviceId: service.id,
          url: service.url,
        };
      });
      array.push(...servicesWithOfficeId);
    });
  });

  return array;
};
