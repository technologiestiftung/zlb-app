const data = require("../source/_data/aemter.json");
const fs = require("fs");

const geojson = {
  "type": "FeatureCollection",
  "features": []
}

data.forEach(bezirksamt => {
  bezirksamt.items.forEach(office => {

    const { coordinates } = office.details;

    const feature = {
      "type": "Feature",
      "properties": {
        ...office,
        parent: bezirksamt.label
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          Number(coordinates[1]),
          Number(coordinates[0])
        ]
      }
    }

    geojson.features.push(feature);
  })
});

fs.writeFile("../source/_data/aemter.geojson", JSON.stringify(geojson), (err) => {
  if (err) throw err;
  console.log("aemter.geojson has been saved.");
});
