import mapboxgl from "mapbox-gl";
// -------------------------------------------------------
// Initialize map
// -------------------------------------------------------
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [13.400033, 52.520952],
  zoom: 12,
});

// -------------------------------------------------------
// Set marker data
// -------------------------------------------------------
const fetchData = async () => {
  const response = await fetch("/data/aemter.geojson")
  const data = response.json();
  return data;
}

map.on("load", () => {
  fetchData()
    .then(data => {
      addMarkers(data);
    })
    .catch(err => console.error(err));
});

// -------------------------------------------------------
// Add markers
// -------------------------------------------------------
const addMarkers = data => {

  data.features.forEach(feature => {

    const popupContent = `
      <h1 class="title is-size-6">${feature.properties.details.title}</h1>
      <div class="buttons">
        <a class="button" disabled>Zum Standort</a>
        <a class="button" disabled>Zur Terminvereinbarung</a>
      </div>
    `;

    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    new mapboxgl.Marker(markerElement)
      .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
      .setPopup(new mapboxgl.Popup().setHTML(popupContent))
      .addTo(map);
  })
}

