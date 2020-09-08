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
        ...office
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

fs.writeFile("../source/mapdata/aemter.geojson", JSON.stringify(geojson), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
