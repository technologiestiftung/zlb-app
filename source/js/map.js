import mapboxgl from "mapbox-gl";
import { bbox } from "@turf/turf";
// -------------------------------------------------------
// Initialize map
// -------------------------------------------------------
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const url = new URL(window.location.href);
const serviceId = url.searchParams.has("serviceId")
  ? url.searchParams.get("serviceId")
  : undefined;

const initialMapSettings = {
  center: [13.400033, 52.520952],
  zoom: 10,
};

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: initialMapSettings.center,
  zoom: initialMapSettings.zoom,
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

// -------------------------------------------------------
// Location search
// -------------------------------------------------------
const addressInputNode = document.querySelector("input[name=address]");
addressInputNode.addEventListener("input", (event) => {
  updateSearch(event);
});

const resultsNode = document.querySelector(".results");
const clearResults = () => {
  while (resultsNode.firstChild) {
    resultsNode.removeChild(resultsNode.firstChild);
  }
};

const updateSearch = async (event) => {
  try {
    if (event.target.value.length >= 3) {
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?autocomplete=true&language=de&country=de&bbox=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973&access_token=${process.env.MAPBOX_TOKEN}`;
      const response = await fetch(geocodingUrl);
      if (response.ok) {
        const json = await response.json();

        resultsNode.classList.add("is-visible");

        if (resultsNode.hasChildNodes()) clearResults();

        json.features.forEach((feature) => {
          const [xCoord, yCoord] = feature.geometry.coordinates;

          const listItem = document.createElement("li");
          const listContent = document.createTextNode(
            `${feature["place_name"]}`
          );
          listItem.appendChild(listContent);
          listItem.className = "py-2 px-1 is-size-7";

          listItem.onclick = () => {
            event.target.value = "";
            clearResults();

            map.flyTo({
              center: [xCoord, yCoord],
              zoom: 16,
              essential: false,
            });
          };

          resultsNode.appendChild(listItem);
        });
      } else {
        return;
      }
    } else {
      if (resultsNode.classList.contains("is-visible"))
        resultsNode.classList.remove("is-visible");
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

// -------------------------------------------------------
// District select
// -------------------------------------------------------
let bezirksgrenzenData = {};
const selectNode = document.querySelector("select");
selectNode.onchange = (event) => {
  if (!event.target.value) {
    map.flyTo({
      center: initialMapSettings.center,
      zoom: initialMapSettings.zoom,
    });
    return;
  }

  const selectedData = bezirksgrenzenData.features.find((bezirk) => {
    return bezirk.properties["Gemeinde_name"] === event.target.value;
  });
  const [minX, minY, maxX, maxY] = bbox(selectedData.geometry);
  map.fitBounds([
    [minX, minY],
    [maxX, maxY],
  ]);
};

const fetchDistrictData = async () => {
  const response = await fetch("/data/bezirksgrenzen.geojson");
  const data = response.json();
  return data;
};

fetchDistrictData()
  .then((data) => {
    bezirksgrenzenData = data;
    data.features.forEach((feature) => {
      const option = document.createElement("option");
      const optionContent = document.createTextNode(
        `${feature.properties["Gemeinde_name"]}`
      );
      option.appendChild(optionContent);
      selectNode.appendChild(option);
    });
  })
  .catch((error) => console.error(error));
