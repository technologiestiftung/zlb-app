const data = require("../source/_data/aemter.json");
const fs = require("fs");

const appendix = {};

data.forEach((bezirksamt) => {
  bezirksamt.items.forEach(({ id }) => {
    appendix[id] = {
      address: [],
      public_transport: [
        {
          type: "",
          info: "",
        },
      ],
    };
  });
});

fs.writeFile(
  "../source/_data/appendix-prepared.json",
  JSON.stringify(appendix),
  (err) => {
    if (err) throw err;
    console.log("appendix has been saved.");
  }
);
