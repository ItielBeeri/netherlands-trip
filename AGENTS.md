# Agent Instructions: "Family Trip to the Netherlands 2026" SPA

## 1. The Story & Product Vision
You are acting as an expert Frontend Developer and UX/UI Designer. You are assisting in building a highly custom, single-page application (SPA) that will serve as the ultimate "digital brochure" and single source of truth for a massive extended family trip to the Netherlands in the summer of 2026.

**The Scale of the Event:**
- 33 participants spanning three generations (ages ranging from 1 to 65).
- The family will be traveling together in a convoy of 8 motorhomes.
- The logistical complexity is high, so the website must build excitement while clearly communicating the itinerary, driving routes, and campsite details.

## 2. Target Audience & UX Philosophy
The user base is extremely diverse in terms of age, technical literacy, and attention span. Every design and code decision must adhere to the principle of **Progressive Disclosure**, catering to two distinct personas:

*   **Persona A: "The Skimmers" (The majority of the family, kids, casual readers)**
    *   *Needs:* High-level visual overview, excitement, and a general sense of the route.
    *   *UX Implementation:* A beautiful, illustrated, game-like map layer. Large, swipeable image carousels. Clean summary cards for each day. They should not be bogged down by heavy text or exact coordinates unless they ask for it.
*   **Persona B: "The Deep Divers" (The planners, the drivers, the organizers)**
    *   *Needs:* Exact geographical coordinates, precise driving routes, official website links, and logistical clarity.
    *   *UX Implementation:* A toggle to switch the map to a real, accurate geographic layer (OpenStreetMap). Clickable UI elements that open detailed modals containing exact addresses, day-by-day breakdowns, and direct links to Google Maps navigation.

## 3. Technical Architecture & Stack
- **Environment:** Pure "Vanilla Web" (HTML5, CSS3, ES6+ JavaScript).
- **Deployment:** The site will be hosted entirely on GitHub Pages. It must remain 100% static.
- **Dependencies:** 
  - `Leaflet.js` (v1.9.4) for map rendering.
  - No package managers (no npm, yarn), no build steps (no Webpack, Vite), and no frameworks (no React, Vue). 
  - All external assets (fonts, icons, map tiles) must be loaded via public CDNs.
- **Routing API:** OSRM (Open Source Routing Machine) public API (`router.project-osrm.org`) is used to fetch and draw real-time driving polylines between waypoints.

## 4. Strict Development Rules & Constraints

### 4.1. Language and Layout (RTL Strictness)
- The entire UI is in Hebrew (`he`), with the exception of specific geographic place names which are kept in English or their native language.
- The application operates in strict Right-to-Left (RTL) layout (`<html dir="rtl">`).
- **CSS Rule:** When implementing styling (e.g., margins, padding, positioning for UI elements like carousel arrows or sidebars), always respect the RTL flow. Test mental models for RTL (e.g., the "Next" arrow points left, "Previous" points right).

### 4.2. The Dual-Map System
The core engine of this SPA is a single Leaflet map instance that toggles between two visual states while maintaining accurate underlying data:
- **Illustrated Layer:** `L.imageOverlay` using an illustrated map image, stretched across bounds (`nlBounds`) that roughly approximate the GPS coordinates of the Netherlands.
- **Geographic Layer:** Standard OpenStreetMap tile layer.
- **Constraint:** Always use real geographic coordinates (`[Lat, Lng]`) for markers. Do NOT switch Leaflet to `CRS.Simple`. The routing API (OSRM) relies on real-world coordinates. The illustrated map is intentionally skewed to fit over geographic bounds.

### 4.3. Data Management
- The single source of truth for the itinerary is the `tripData` array inside `app.js`.
- Modifications to dates, locations, images, or descriptions must only occur within this JSON-like structure.
- Leaflet requires coordinates as `[Latitude, Longitude]`. OSRM requires them as `[Longitude, Latitude]` in the fetch URL. Handle this transformation carefully.

### 4.4. Code Quality & Modularity
- Do not over-engineer. Avoid complex state management patterns.
- Use native DOM manipulation (`document.getElementById`, `querySelector`, `classList`).
- Favor CSS transitions and transforms over JavaScript-driven animations to ensure smooth performance on older mobile devices (which some family members will inevitably use).