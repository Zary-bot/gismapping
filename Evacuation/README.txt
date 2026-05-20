EVACUATION CENTER MAPPING SYSTEM
Interactive GIS-Based Mapping Application

PROJECT CONTENTS
- index.html
- css/style.css
- js/app.js
- data/tunga_evacuation_sites.geojson
- images/tunga_evacuation_map.png
- images/*.svg resources
- qgis/BaseMap.qgz
- screenshots/*.png
- documentation.pdf

HOW TO RUN
Option 1: Open index.html directly in a browser.
Option 2: For the best result, run a local server inside the project folder:
  python -m http.server 8000
Then open:
  http://localhost:8000

IMPORTANT BASEMAP NOTE
The uploaded QGIS project file is included at:
  qgis/BaseMap.qgz

The QGZ file contains an OpenStreetMap XYZ basemap source:
  https://tile.openstreetmap.org/{z}/{x}/{y}.png

A .qgz file cannot be opened directly by normal HTML/JavaScript in a browser, so this system uses the same QGIS basemap source as a Leaflet tile layer. This allows the map to remain visible and clear when zooming in or out. If Leaflet/CDN or internet access is unavailable, the system automatically falls back to the provided map image so the project can still be demonstrated offline.

SYSTEM FEATURES
1. Interactive map with zoom and pan navigation.
2. OpenStreetMap/QGIS basemap display through Leaflet tiles.
3. Marker visualization for evacuation centers and related facilities.
4. Popup information with location name, type, description, image, capacity, and contact.
5. Functional search feature: type a location and press Enter or click the search icon to zoom to it.
6. Layer control for Evacuation Centers, Barangay Halls, Schools, and Basketball Courts.
7. Legend for map symbols and categories, including roads from the basemap.
8. Responsive design for desktop, laptop, tablet, and mobile screens.

BLACK ROAD LINE FIX
The previous version drew custom LineString road overlays, which created the unwanted thick black line shown in the screenshot. This updated version removes the custom road overlay completely. Roads now come only from the OpenStreetMap/QGIS basemap.

DATA NOTE
The GeoJSON now uses WGS84 coordinates [longitude, latitude] for Leaflet mapping. Pixel coordinates are kept only as an offline fallback for the supplied map image. Replace sample capacities/contact values with verified LGU/DRRMO data before final submission.

TOOLS USED
- QGIS for basemap preparation/reference output
- Leaflet for interactive mapping
- OpenStreetMap XYZ tiles from the QGIS BaseMap.qgz file
- HTML, CSS, and JavaScript for the web interface
- GeoJSON for structured map location data
