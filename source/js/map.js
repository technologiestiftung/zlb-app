import mapboxgl from "mapbox-gl";
// -------------------------------------------------------
// Initialize map
// -------------------------------------------------------
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const url = new URL(window.location.href);
const serviceId = url.searchParams.has("serviceId")
  ? url.searchParams.get("serviceId")
  : undefined;

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
  const response = await fetch("/data/aemter.geojson");
  const data = await response.json();

  // filter offices that offer selected service
  const filtered = data.features.filter((feature) => {
    return feature.properties.details.services.some((service) => {
      return service.id === serviceId && service.appointment === true;
    });
  });
  return {
    ...data,
    features: serviceId ? filtered : data.features,
  };
};

map.on("load", () => {
  fetchData()
    .then((data) => {
      addMarkers(data);
    })
    .catch((err) => console.error(err));
});

// -------------------------------------------------------
// Add markers
// -------------------------------------------------------
const addMarkers = (data) => {
  data.features.forEach((feature) => {
    const popupContent = `
      <div class="px-2 py-2">
        <p class="is-size-6 mb-0">${feature.properties.parent}</p>
        <h1 class="title is-6 mt-1 mb-0">${feature.properties.label}</h1>
        <p class="is-size-6 mt-1">[Straße und Hausnummer]</p>
        <p class="is-size-6 mt-1">[PLZ und Ort]</p>
      </div>
    `;

    const markerElement = document.createElement("div");
    markerElement.className = "marker";

    const popupOptions = {
      maxWidth: "348px",
    };

    new mapboxgl.Marker(markerElement)
      .setLngLat([
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
      ])
      .setPopup(new mapboxgl.Popup(popupOptions).setHTML(popupContent))
      .addTo(map);
  });
};
