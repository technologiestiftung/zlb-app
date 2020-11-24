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
  zoom: 10,
});

// -------------------------------------------------------
// Set marker data
// -------------------------------------------------------
const fetchData = async () => {
  const [aemterResponse, libraryResponse] = await Promise.all([
    await fetch("/data/aemter.geojson"),
    await fetch("/data/libraries.geojson"),
  ]);
  const aemterData = await aemterResponse.json();
  const libraryData = await libraryResponse.json();

  // filter offices that offer selected service
  const filteredAemter = aemterData.features.filter((feature) => {
    return feature.properties.details.services.some((service) => {
      return service.id === serviceId && service.appointment === true;
    });
  });
  return [
    {
      ...aemterData,
      features: serviceId ? filteredAemter : data.features,
    },
    libraryData,
  ];
};

map.on("load", () => {
  fetchData()
    .then(([aemter, libraries]) => {
      map.loadImage("/images/icon_location.png", (error, image) => {
        if (error) throw error;
        map.addImage("location", image);
        addLibraries(libraries);
      });
      addMarkers(aemter);
    })
    .catch((err) => console.error(err));
});

// -------------------------------------------------------
// Add markers
// -------------------------------------------------------
const addMarkers = (data) => {
  data.features.forEach((feature) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker marker-office";

    const marker = new mapboxgl.Marker(markerElement).setLngLat([
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1],
    ]);

    const popupContent = `
      <div class="px-2 py-2">
        <p class="is-size-6 mb-0">${feature.properties.parent}</p>
        <h1 class="title is-6 mt-1 mb-0">${feature.properties.label}</h1>
        <p class="is-size-6 mt-1">[Straße und Hausnummer]</p>
        <p class="is-size-6 mt-1">[PLZ und Ort]</p>
      </div>
    `;

    const popupOptions = {
      maxWidth: "348px",
    };

    const popup = new mapboxgl.Popup(popupOptions)
      .setHTML(popupContent)
      .on("open", () => handleOpenSidebar(feature))
      .on("close", () => handleCloseSidebar(feature));

    marker.setPopup(popup).addTo(map);
  });
};

// -------------------------------------------------------
// Add libraries
// -------------------------------------------------------
const addLibraries = (data) => {
  map.addSource("libraries", {
    type: "geojson",
    data: data,
  });

  map.addLayer({
    id: "library-labels",
    type: "symbol",
    source: "libraries",
    minzoom: 12,
    layout: {
      "text-field": ["get", "label"],
      "text-anchor": "top",
      "text-justify": "auto",
      "text-offset": [0, 2],
      "text-size": 12,
      "icon-image": "location",
      "icon-size": 0.75,
    },
  });
};

// -------------------------------------------------------
// Sidebar handling
// -------------------------------------------------------
let currentSidebarTitle = "";
const sidebarNode = document.querySelector("#map-sidebar .sidebar-content");

const handleOpenSidebar = (data) => {
  currentSidebarTitle = data.properties.label;

  if (!sidebarNode.classList.contains("is-opened")) {
    sidebarNode.classList.add("is-opened");
  }

  sidebarNode.querySelector("h1").textContent = data.properties.parent;
  sidebarNode.querySelector("h2").textContent = data.properties.label;

  let accessibilityParagraph = "";
  data.properties.details.accessibility.forEach((item) => {
    accessibilityParagraph += ` ${item.title}`;
  });
  sidebarNode.querySelector(
    ".accessibility"
  ).textContent = accessibilityParagraph;
};

const handleCloseSidebar = (data) => {
  if (currentSidebarTitle === data.properties.label) {
    sidebarNode.classList.remove("is-opened");
  }
};
