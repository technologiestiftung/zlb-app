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
      <h2 class="subtitle is-6 has-text-dark">${feature.properties.parent}</h2>
      <h1 class="title is-6">${feature.properties.label}</h1>
      <div class="buttons">
        <a class="button" disabled>Zum Standort</a>
        <a class="button" disabled>Zur Terminvereinbarung</a>
      </div>
    `;

    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    const popupOptions = {
      maxWidth: "348px"
    }

    new mapboxgl.Marker(markerElement)
      .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
      .setPopup(new mapboxgl.Popup(popupOptions).setHTML(popupContent))
      .addTo(map);
  })
}

