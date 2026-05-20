const IMAGE_WIDTH = 1160;
const IMAGE_HEIGHT = 767;
const MAP_IMAGE = "images/tunga_evacuation_map.png";
const DATA_URL = "data/tunga_evacuation_sites.geojson";

/*
  Basemap source:
  The uploaded QGIS project file qgis/BaseMap.qgz contains an OpenStreetMap XYZ basemap:
  https://tile.openstreetmap.org/{z}/{x}/{y}.png

  A .qgz file cannot be opened directly inside a normal browser, so the web system uses
  the same QGIS basemap source as a Leaflet tile layer. This keeps the map visible and
  clear when users zoom in or zoom out.
*/
const BASEMAP_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const BASEMAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_CENTER = [11.24815, 124.75175];
const START_ZOOM = 16;

const FALLBACK_DATA = {
  "type": "FeatureCollection",
  "name": "tunga_evacuation_center_mapping",
  "description": "Evacuation center and support location sample dataset for Tunga, Leyte. Coordinates are WGS84 [longitude, latitude]. Pixel values are used only for the offline image fallback.",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "site-001",
        "name": "Brgy Hall",
        "category": "Barangay Halls",
        "layers": [
          "Evacuation Centers",
          "Barangay Halls"
        ],
        "type": "Barangay Hall / Evacuation Support",
        "description": "Barangay coordination point for registration, information, and initial disaster response assistance.",
        "capacity": "100 persons / coordination area",
        "contact": "Barangay officials / local DRRM volunteers",
        "image": "images/barangay-hall.svg",
        "pixel": [
          295,
          286
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.74824,
          11.2509
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-002",
        "name": "San Roque Basketball Court",
        "category": "Basketball Courts",
        "layers": [
          "Evacuation Centers",
          "Basketball Courts"
        ],
        "type": "Covered Court / Temporary Assembly Area",
        "description": "Open community court that may serve as a temporary assembly and relief distribution area during emergencies.",
        "capacity": "150 persons",
        "contact": "San Roque barangay responders",
        "image": "images/basketball-court.svg",
        "pixel": [
          306,
          335
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.7483632,
          11.2499166
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-003",
        "name": "Tunga Central School",
        "category": "Schools",
        "layers": [
          "Evacuation Centers",
          "Schools"
        ],
        "type": "School / Evacuation Center",
        "description": "Designated temporary evacuation center for nearby residents. Classrooms and open spaces may be used for shelter and registration.",
        "capacity": "300 persons",
        "contact": "School DRRM coordinator",
        "image": "images/school-building.svg",
        "pixel": [
          420,
          439
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.75016,
          11.24667
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-004",
        "name": "Sto. Niño Brgy Hall",
        "category": "Barangay Halls",
        "layers": [
          "Evacuation Centers",
          "Barangay Halls"
        ],
        "type": "Barangay Hall / Evacuation Support",
        "description": "Barangay-level assistance point for monitoring evacuees, coordinating supplies, and relaying emergency information.",
        "capacity": "100 persons / coordination area",
        "contact": "Sto. Niño barangay officials",
        "image": "images/barangay-hall.svg",
        "pixel": [
          568,
          436
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.75337,
          11.24742
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-005",
        "name": "Gregorio C. Catenza National Highschool",
        "category": "Schools",
        "layers": [
          "Evacuation Centers",
          "Schools"
        ],
        "type": "School / Evacuation Center",
        "description": "School facility identified on the map that can support evacuation, temporary shelter, and emergency coordination activities.",
        "capacity": "250 persons",
        "contact": "School DRRM coordinator",
        "image": "images/school-building.svg",
        "pixel": [
          669,
          158
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.75606,
          11.25202
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-006",
        "name": "San Pedro Basketball Court",
        "category": "Basketball Courts",
        "layers": [
          "Evacuation Centers",
          "Basketball Courts"
        ],
        "type": "Basketball Court / Temporary Assembly Area",
        "description": "Community court that may be used as a visible gathering point and temporary relief area during disasters.",
        "capacity": "150 persons",
        "contact": "San Pedro barangay responders",
        "image": "images/basketball-court.svg",
        "pixel": [
          677,
          256
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.75597,
          11.25016
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "site-007",
        "name": "San Antonio Basketball Court",
        "category": "Basketball Courts",
        "layers": [
          "Evacuation Centers",
          "Basketball Courts"
        ],
        "type": "Basketball Court / Temporary Assembly Area",
        "description": "Southern community court location used as an assembly point for residents near the river and nearby roads.",
        "capacity": "120 persons",
        "contact": "San Antonio barangay responders",
        "image": "images/basketball-court.svg",
        "pixel": [
          381,
          725
        ]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          124.7486386,
          11.2419542
        ]
      }
    }
  ]
};

const LAYER_CONFIG = {
  "Evacuation Centers": { color: "#2563eb", symbol: "E", shape: "pin", label: "Evacuation Centers" },
  "Barangay Halls": { color: "#16a34a", symbol: "B", shape: "triangle", label: "Barangay Halls" },
  "Schools": { color: "#6d28d9", symbol: "S", shape: "circle", label: "Schools" },
  "Basketball Courts": { color: "#f97316", symbol: "C", shape: "circle", label: "Basketball Courts" }
};

// Roads are now part of the OpenStreetMap/QGIS basemap. No custom black road layer is drawn.
const LEGEND_EXTRA = {
  "Roads (basemap)": { color: "#374151", symbol: "", shape: "line", label: "Roads (basemap)" }
};

const DEFAULT_LAYERS = Object.keys(LAYER_CONFIG);

let appState = {
  data: null,
  pointFeatures: [],
  visibleLayers: new Set(DEFAULT_LAYERS),
  engine: "fallback",
  leaflet: null,
  simple: null,
  selectedFeature: null
};

async function loadGeoJSON() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("GeoJSON response failed");
    return await response.json();
  } catch (error) {
    return FALLBACK_DATA;
  }
}

function layerListFromFeature(feature) {
  const layers = feature.properties && feature.properties.layers;
  if (Array.isArray(layers) && layers.length) return layers;
  return [feature.properties.category || "Evacuation Centers"];
}

function visibleByLayer(feature) {
  return layerListFromFeature(feature).some(layer => appState.visibleLayers.has(layer));
}

function getDisplayLayer(feature) {
  const p = feature.properties || {};
  if (p.category && LAYER_CONFIG[p.category]) return p.category;
  return layerListFromFeature(feature).find(layer => LAYER_CONFIG[layer]) || "Evacuation Centers";
}

function featureLatLng(feature) {
  const coords = feature.geometry.coordinates;
  return [coords[1], coords[0]];
}

function featurePixel(feature) {
  const p = feature.properties || {};
  if (Array.isArray(p.pixel)) return p.pixel;
  return [IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2];
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function markerHtml(feature) {
  const displayLayer = getDisplayLayer(feature);
  const conf = LAYER_CONFIG[displayLayer] || LAYER_CONFIG["Evacuation Centers"];
  const shapeClass = conf.shape === "triangle" ? "triangle" : conf.shape === "circle" ? "circle" : "pin";
  return `<div class="custom-marker" title="${escapeHtml(feature.properties.name)}"><div class="marker-symbol ${shapeClass}" style="background:${conf.color}"><span>${conf.symbol}</span></div></div>`;
}

function popupHtml(feature) {
  const p = feature.properties || {};
  return `
    <div class="app-popup">
      <h3>${escapeHtml(p.name)}</h3>
      <span class="popup-type">${escapeHtml(p.type || p.category)}</span>
      <div class="popup-body">
        <div>
          <p>${escapeHtml(p.description)}</p>
          <div class="popup-meta"><strong>Capacity:</strong> ${escapeHtml(p.capacity || "Not specified")}<br><strong>Contact:</strong> ${escapeHtml(p.contact || "Not specified")}</div>
        </div>
        ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)} image">` : ""}
      </div>
    </div>`;
}

function updateDetails(feature) {
  appState.selectedFeature = feature;
  const p = feature.properties || {};
  const details = document.getElementById("locationDetails");
  details.innerHTML = `
    <h2>Selected Location</h2>
    ${p.image ? `<img class="detail-image" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)} image">` : ""}
    <h3 class="detail-name">${escapeHtml(p.name)}</h3>
    <span class="badge">${escapeHtml(p.type || p.category)}</span>
    <p>${escapeHtml(p.description)}</p>
    <table class="detail-table">
      <tr><td>Category</td><td>${escapeHtml(p.category)}</td></tr>
      <tr><td>Layers</td><td>${escapeHtml(layerListFromFeature(feature).join(", "))}</td></tr>
      <tr><td>Capacity</td><td>${escapeHtml(p.capacity || "Not specified")}</td></tr>
      <tr><td>Contact</td><td>${escapeHtml(p.contact || "Not specified")}</td></tr>
    </table>`;
}

function buildControls() {
  const list = document.getElementById("layerList");
  list.innerHTML = "";
  Object.entries(LAYER_CONFIG).forEach(([name, conf]) => {
    const label = document.createElement("label");
    label.className = "checkline";
    const symbol = conf.shape === "line"
      ? `<span class="layer-icon shape-line"></span>`
      : `<span class="layer-icon shape-${conf.shape}" style="background:${conf.color}"><span>${conf.symbol}</span></span>`;
    label.innerHTML = `<input type="checkbox" data-layer="${escapeHtml(name)}" checked />${symbol}<span>${escapeHtml(conf.label)}</span>`;
    list.appendChild(label);
  });

  list.addEventListener("change", (event) => {
    const checkbox = event.target.closest("input[data-layer]");
    if (!checkbox) return;
    if (checkbox.checked) appState.visibleLayers.add(checkbox.dataset.layer);
    else appState.visibleLayers.delete(checkbox.dataset.layer);
    syncAllLayersCheckbox();
    applyLayerVisibility();
    renderResults(document.getElementById("searchInput").value);
  });

  document.getElementById("allLayers").addEventListener("change", (event) => {
    const checked = event.target.checked;
    appState.visibleLayers = new Set(checked ? DEFAULT_LAYERS : []);
    document.querySelectorAll("#layerList input[data-layer]").forEach(box => box.checked = checked);
    applyLayerVisibility();
    renderResults(document.getElementById("searchInput").value);
  });

  buildLegend();
}

function syncAllLayersCheckbox() {
  const allChecked = DEFAULT_LAYERS.every(layer => appState.visibleLayers.has(layer));
  document.getElementById("allLayers").checked = allChecked;
}

function buildLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = "";
  const legendItems = { ...LAYER_CONFIG, ...LEGEND_EXTRA };
  Object.entries(legendItems).forEach(([name, conf]) => {
    const row = document.createElement("div");
    row.className = "legend-row";
    const symbol = conf.shape === "line"
      ? `<span class="legend-symbol shape-line"></span>`
      : `<span class="legend-symbol shape-${conf.shape}" style="background:${conf.color}"><span>${conf.symbol}</span></span>`;
    row.innerHTML = `${symbol}<span>${escapeHtml(name)}</span>`;
    legend.appendChild(row);
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchAndFocus();
    }
  });

  const searchButton = document.getElementById("searchButton");
  if (searchButton) searchButton.addEventListener("click", searchAndFocus);

  document.getElementById("clearSearch").addEventListener("click", () => {
    input.value = "";
    renderResults("");
    input.focus();
  });
}

function getMatches(query) {
  const normalized = query.trim().toLowerCase();
  return appState.pointFeatures.filter(feature => {
    if (!visibleByLayer(feature)) return false;
    const p = feature.properties || {};
    const text = [p.name, p.category, p.type, p.description].join(" ").toLowerCase();
    return !normalized || text.includes(normalized);
  });
}

function renderResults(query) {
  const results = document.getElementById("searchResults");
  const normalized = query.trim().toLowerCase();
  const matches = getMatches(query);
  results.innerHTML = "";

  if (normalized && matches.length === 0) {
    results.innerHTML = `<p class="empty-result">No location found.</p>`;
    return;
  }

  matches.slice(0, normalized ? 10 : 4).forEach(feature => {
    const displayLayer = getDisplayLayer(feature);
    const conf = LAYER_CONFIG[displayLayer] || LAYER_CONFIG["Evacuation Centers"];
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `<span class="layer-icon shape-${conf.shape === "triangle" ? "triangle" : conf.shape === "circle" ? "circle" : "pin"}" style="background:${conf.color}"><span>${conf.symbol}</span></span><div><strong>${escapeHtml(feature.properties.name)}</strong><span>${escapeHtml(feature.properties.type || feature.properties.category)}</span></div>`;
    card.addEventListener("click", () => {
      document.getElementById("searchInput").value = feature.properties.name;
      renderResults(feature.properties.name);
      focusFeature(feature);
    });
    results.appendChild(card);
  });
}

function searchAndFocus() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim();
  const matches = getMatches(query);
  renderResults(query);
  if (matches.length > 0) {
    const exact = matches.find(f => f.properties.name.toLowerCase() === query.toLowerCase());
    focusFeature(exact || matches[0]);
  }
}

function applyLayerVisibility() {
  if (appState.engine === "leaflet" && appState.leaflet) appState.leaflet.applyLayerVisibility();
  if (appState.engine === "fallback" && appState.simple) appState.simple.applyLayerVisibility();
}

function focusFeature(feature) {
  updateDetails(feature);
  if (appState.engine === "leaflet" && appState.leaflet) appState.leaflet.focusFeature(feature);
  if (appState.engine === "fallback" && appState.simple) appState.simple.focusFeature(feature);
}

function initLeaflet() {
  appState.engine = "leaflet";
  const mapEl = document.getElementById("map");
  mapEl.innerHTML = "";
  const map = L.map("map", {
    zoomControl: false,
    minZoom: 14,
    maxZoom: 19,
    scrollWheelZoom: true
  }).setView(MAP_CENTER, START_ZOOM);

  L.tileLayer(BASEMAP_TILE_URL, {
    maxZoom: 19,
    attribution: BASEMAP_ATTRIBUTION,
    crossOrigin: true
  }).addTo(map);

  L.control.zoom({ position: "topleft" }).addTo(map);

  const markerObjects = new Map();
  const markerLayer = L.layerGroup().addTo(map);

  appState.pointFeatures.forEach(feature => {
    const displayLayer = getDisplayLayer(feature);
    const conf = LAYER_CONFIG[displayLayer] || LAYER_CONFIG["Evacuation Centers"];
    const shapeClass = conf.shape === "triangle" ? "triangle" : conf.shape === "circle" ? "circle" : "pin";
    const icon = L.divIcon({
      className: "leaflet-custom-wrapper",
      html: `<div class="custom-marker"><div class="marker-symbol ${shapeClass}" style="background:${conf.color}"><span>${conf.symbol}</span></div></div>`,
      iconSize: [30, 38],
      iconAnchor: [15, 38],
      popupAnchor: [0, -36]
    });
    const marker = L.marker(featureLatLng(feature), { icon })
      .bindPopup(popupHtml(feature), { maxWidth: 330 })
      .on("click", () => updateDetails(feature));
    marker.addTo(markerLayer);
    markerObjects.set(feature.properties.id, { feature, marker });
  });

  appState.leaflet = {
    map,
    applyLayerVisibility() {
      markerObjects.forEach((entry) => {
        const shown = visibleByLayer(entry.feature);
        if (shown && !markerLayer.hasLayer(entry.marker)) markerLayer.addLayer(entry.marker);
        if (!shown && markerLayer.hasLayer(entry.marker)) markerLayer.removeLayer(entry.marker);
      });
    },
    focusFeature(feature) {
      const entry = markerObjects.get(feature.properties.id);
      if (!entry) return;
      if (!visibleByLayer(feature)) return;
      map.setView(featureLatLng(feature), Math.max(map.getZoom(), 17), { animate: true });
      setTimeout(() => entry.marker.openPopup(), 180);
    }
  };

  setTimeout(() => {
    map.invalidateSize();
    const defaultFeature = appState.pointFeatures.find(f => f.properties.name === "Tunga Central School") || appState.pointFeatures[0];
    if (defaultFeature) focusFeature(defaultFeature);
  }, 350);
}

class SimpleMap {
  constructor(container) {
    this.container = container;
    this.markers = new Map();
    this.scale = 1;
    this.minScale = .35;
    this.maxScale = 3.2;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.lastPointer = null;
    this.activePopupFeature = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <img class="simple-image-layer" src="${MAP_IMAGE}" alt="Tunga evacuation map">
      <div class="simple-marker-layer"></div>
      <div class="simple-ui-layer">
        <div class="zoom-control"><button type="button" data-zoom="in">+</button><button type="button" data-zoom="out">−</button></div>
        <div class="map-help">Offline fallback: drag to pan • scroll to zoom</div>
        <div class="attribution">Basemap source: qgis/BaseMap.qgz / OpenStreetMap XYZ</div>
      </div>`;
    this.image = this.container.querySelector(".simple-image-layer");
    this.markerLayer = this.container.querySelector(".simple-marker-layer");
    this.popupEl = document.createElement("div");
    this.popupEl.className = "simple-popup";
    this.popupEl.hidden = true;
    this.container.appendChild(this.popupEl);
    this.createMarkers();
    this.bindEvents();
    this.fit();
    window.addEventListener("resize", () => this.fit(false));
    setTimeout(() => {
      const defaultFeature = appState.pointFeatures.find(f => f.properties.name === "Tunga Central School") || appState.pointFeatures[0];
      if (defaultFeature) this.focusFeature(defaultFeature, true);
    }, 350);
  }

  createMarkers() {
    appState.pointFeatures.forEach(feature => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = markerHtml(feature);
      const marker = wrapper.firstElementChild;
      marker.addEventListener("click", (event) => {
        event.stopPropagation();
        updateDetails(feature);
        this.openPopup(feature);
      });
      this.markerLayer.appendChild(marker);
      this.markers.set(feature.properties.id, { feature, marker });
    });
  }

  bindEvents() {
    this.container.querySelector("[data-zoom='in']").addEventListener("click", () => this.zoomAt(this.container.clientWidth / 2, this.container.clientHeight / 2, 1.22));
    this.container.querySelector("[data-zoom='out']").addEventListener("click", () => this.zoomAt(this.container.clientWidth / 2, this.container.clientHeight / 2, .82));
    this.container.addEventListener("wheel", (event) => {
      event.preventDefault();
      const rect = this.container.getBoundingClientRect();
      this.zoomAt(event.clientX - rect.left, event.clientY - rect.top, event.deltaY < 0 ? 1.12 : .88);
    }, { passive: false });
    this.container.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || event.target.closest(".custom-marker") || event.target.closest(".simple-popup")) return;
      this.dragging = true;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.container.setPointerCapture(event.pointerId);
    });
    this.container.addEventListener("pointermove", (event) => {
      if (!this.dragging || !this.lastPointer) return;
      this.offsetX += event.clientX - this.lastPointer.x;
      this.offsetY += event.clientY - this.lastPointer.y;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.render();
    });
    this.container.addEventListener("pointerup", () => { this.dragging = false; this.lastPointer = null; });
    this.container.addEventListener("click", (event) => {
      if (!event.target.closest(".simple-popup") && !event.target.closest(".custom-marker")) this.closePopup();
    });
  }

  fit(openDefault = true) {
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 500;
    const fitScale = Math.min(w / IMAGE_WIDTH, h / IMAGE_HEIGHT);
    this.minScale = Math.max(.25, fitScale * .72);
    if (openDefault) this.scale = fitScale * 1.18;
    else this.scale = Math.max(this.minScale, this.scale);
    if (openDefault) {
      this.offsetX = (w - IMAGE_WIDTH * this.scale) / 2;
      this.offsetY = (h - IMAGE_HEIGHT * this.scale) / 2;
    }
    this.render();
  }

  zoomAt(screenX, screenY, factor) {
    const oldScale = this.scale;
    const newScale = Math.min(this.maxScale, Math.max(this.minScale, oldScale * factor));
    const imageX = (screenX - this.offsetX) / oldScale;
    const imageY = (screenY - this.offsetY) / oldScale;
    this.scale = newScale;
    this.offsetX = screenX - imageX * newScale;
    this.offsetY = screenY - imageY * newScale;
    this.render();
  }

  render() {
    const transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
    this.image.style.transform = transform;
    this.markers.forEach(entry => {
      const [x, y] = featurePixel(entry.feature);
      entry.marker.style.left = `${this.offsetX + x * this.scale}px`;
      entry.marker.style.top = `${this.offsetY + y * this.scale}px`;
    });
    this.updatePopupPosition();
  }

  applyLayerVisibility() {
    this.markers.forEach(entry => {
      entry.marker.hidden = !visibleByLayer(entry.feature);
    });
    if (this.activePopupFeature && !visibleByLayer(this.activePopupFeature)) this.closePopup();
  }

  focusFeature(feature, keepZoom = false) {
    const [x, y] = featurePixel(feature);
    if (!keepZoom) this.scale = Math.max(this.scale, Math.min(1.2, this.maxScale));
    this.offsetX = this.container.clientWidth / 2 - x * this.scale;
    this.offsetY = this.container.clientHeight / 2 - y * this.scale;
    this.render();
    this.openPopup(feature);
  }

  openPopup(feature) {
    this.activePopupFeature = feature;
    this.popupEl.hidden = false;
    this.popupEl.innerHTML = `<button type="button" aria-label="Close popup">×</button>${popupHtml(feature)}`;
    this.popupEl.querySelector("button").addEventListener("click", () => this.closePopup());
    this.updatePopupPosition();
  }

  updatePopupPosition() {
    if (!this.activePopupFeature || this.popupEl.hidden) return;
    const [x, y] = featurePixel(this.activePopupFeature);
    const screenX = this.offsetX + x * this.scale;
    const screenY = this.offsetY + y * this.scale;
    const left = Math.min(this.container.clientWidth - 330, Math.max(12, screenX + 18));
    const top = Math.min(this.container.clientHeight - 230, Math.max(12, screenY - 180));
    this.popupEl.style.left = `${left}px`;
    this.popupEl.style.top = `${top}px`;
  }

  closePopup() {
    this.activePopupFeature = null;
    this.popupEl.hidden = true;
  }
}

function initSimpleMap() {
  appState.engine = "fallback";
  const container = document.getElementById("map");
  appState.simple = new SimpleMap(container);
}

function runDemoFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const demo = params.get("demo");
  const input = document.getElementById("searchInput");
  if (demo === "search") {
    input.value = "Tunga Central School";
    renderResults(input.value);
    const feature = appState.pointFeatures.find(f => f.properties.name === "Tunga Central School");
    if (feature) setTimeout(() => focusFeature(feature), 500);
  }
  if (demo === "layers") {
    document.querySelectorAll("#layerList input[data-layer]").forEach(box => {
      if (box.dataset.layer === "Basketball Courts") { box.checked = false; appState.visibleLayers.delete(box.dataset.layer); }
    });
    syncAllLayersCheckbox();
    applyLayerVisibility();
    renderResults(input.value);
  }
}

async function startApp() {
  document.getElementById("map").innerHTML = `<div class="map-loading">Loading interactive map...</div>`;
  appState.data = await loadGeoJSON();
  appState.pointFeatures = appState.data.features.filter(f => f.geometry && f.geometry.type === "Point");

  buildControls();
  setupSearch();

  const startedAt = Date.now();
  function chooseEngine() {
    if (window.L && window.L.map && window.L.tileLayer) initLeaflet();
    else if (Date.now() - startedAt < 800) setTimeout(chooseEngine, 100);
    else initSimpleMap();
    setTimeout(runDemoFromQuery, 900);
  }
  chooseEngine();
  renderResults("");
}

document.addEventListener("DOMContentLoaded", startApp);
