# Pekanbaru Green Canopy — GIS Vegetasi Perkotaan

A GIS web platform built for university coursework at Politeknik Caltex Riau (TA 2025/2026), mapping and analysing **106 roadside shade trees** across four major streets in Pekanbaru — visualising species distribution, trunk diameter, tree health conditions, and surface temperatures to study their ecological contribution to **Urban Heat Island (UHI)** mitigation.

---

## The Workflow

```
Field Survey  →  Excel Entry  →  GeoJSON Conversion  →  React + Leaflet Platform  →  Vercel
(GPSMapCamera)   (Cleaning)     (Python script)         (4 interactive pages)
```

---

## Step 1 — Field Survey

Data was collected directly on four major roads in Pekanbaru City:

- Jalan Diponegoro
- Jalan Gadjah Mada
- Jalan Sumatera
- Jalan Patimura

Each tree was recorded using **GPSMapCamera** for GPS coordinates, a measuring tape for trunk diameter (DBH), visual assessment for health condition, and a portable thermometer for ambient surface temperature. The survey produced **106 tree records**, meeting the minimum dataset requirement for analysis.

Attributes collected per tree: Coordinates (Lat, Long) · Tree Species · Trunk Diameter (cm) · Health Condition (Sehat / Rusak / Kering) · Surface Temperature (°C) · Photo documentation

---

## Step 2 — Data Entry & Cleaning

Survey results were entered into Excel for cleaning and validation — standardising species names, correcting coordinate typos, and handling missing values. The clean spreadsheet was then exported as CSV for conversion.

---

## Step 3 — GeoJSON Conversion

A Python script (`convert_excel_to_geojson.py`) converts the cleaned CSV into GeoJSON format. Each tree becomes a `Feature` point with full attribute properties, ready for Leaflet to consume directly.

```json
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [101.4500, 0.5333] },
  "properties": {
    "id": "PKU001",
    "species": "Angsana",
    "species_latin": "Pterocarpus indicus",
    "diameter": 45.5,
    "condition": "Sehat",
    "temperature": 28.5,
    "ecological_score": 4.5,
    "location": "Jl. Diponegoro",
    "survey_date": "2025-01-10",
    "surveyor": "Tim Kelompok 10"
  }
}
```

---

## Step 4 — React + Leaflet Platform

The website is a single-page application built with **React 19 + Vite**, styled with **Tailwind CSS**, and animated with **Framer Motion**. It consists of four pages:

**Beranda (Home)** — Hero section with real-time aggregated statistics (total trees, species count, average temperature reduction, protected area). Statistics are calculated dynamically via `calculateStats()` from the live GeoJSON dataset.

**Tentang (About)** — Contextual education on the Urban Heat Island phenomenon, research methodology, and the ecological role of roadside trees — backed by four published academic references.

**Peta (Maps)** — The core of the platform. An interactive **Leaflet** map with:
- Colour-coded markers by health condition: green (Sehat) · yellow (Rusak) · red (Kering)
- Marker size proportional to trunk diameter (DBH)
- Multi-layer filtering by condition and real-time search by species, location, or tree ID
- Autocomplete search suggestions (up to 8 results, de-duplicated)
- Real-time statistics recalculated on every filter change
- Satellite / standard tile layer toggle (Google Satellite + OpenStreetMap)
- Rich popups with species name (local + Latin), DBH, condition, temperature, ecological score (1–5), survey date, and surveyor
- Collapsible sidebar, scroll-zoom toggle, auto `fitBounds` on filter

**Kontak (Contact)** — Two-way contact form with institution details, enabling collaboration inquiries.

---

## Step 5 — Deployment

Deployed as a static SPA on **Vercel**. `vercel.json` rewrites all routes to `index.html` to support client-side React Router navigation.

---

## Key Findings

- Trees on surveyed roads show measurably **lower surface temperatures** (avg. −3.2°C) compared to unshaded surfaces — consistent with Ow et al. (2020) findings in Singapore's tropical climate
- **Angsana** (*Pterocarpus indicus*) is the dominant species, with the largest canopy spread and highest ecological scores across all four roads
- A portion of trees are in **Rusak or Kering** condition, indicating maintenance gaps — reducing the overall shading effectiveness of the current roadside vegetation
- Spatial clustering is uneven: some road sections have dense tree cover while others have significant gaps, creating inconsistent thermal comfort for pedestrians
- The data provides a baseline for the local government to prioritise **targeted replanting** and maintenance along high-activity pedestrian corridors

---

## Screenshots

### Interactive Map — Tree Distribution (Leaflet)

> Colour = health condition · Size = trunk diameter · Click marker for full tree profile

### Home Page — Real-time Statistics Dashboard

> Stats aggregated live from GeoJSON: total trees, species count, average temperature reduction

---

## Project Structure

```
pekanbaru-green-canopy/
│
├── public/
│   ├── favicon.svg                → custom green tree icon
│   └── data/
│       ├── trees.json             → full GeoJSON dataset (106 trees)
│       └── sample-trees.json      → sample data for local testing
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ScrollToTop.jsx
│   │   └── layout/
│   │       ├── Header.jsx         → sticky nav with mobile hamburger menu
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx               → landing page, animated stats cards
│   │   ├── About.jsx              → UHI education & research methodology
│   │   ├── Maps.jsx               → Leaflet map, filters, popups, stats
│   │   └── Contact.jsx            → contact form & team info
│   ├── utils/
│   │   └── cn.js                  → clsx + tailwind-merge utility
│   ├── App.jsx                    → React Router setup
│   ├── main.jsx                   → entry point
│   └── index.css                  → Tailwind base + custom components
│
├── convert_excel_to_geojson.py    → CSV → GeoJSON conversion script
├── index.html
├── tailwind.config.js             → emerald green design system
├── vite.config.js
├── vercel.json                    → SPA routing rewrite rules
├── package.json
└── README.md
```

---

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend framework | React 19, Vite 7 |
| Styling & animation | Tailwind CSS 3.4, Framer Motion, Lucide React |
| Routing | React Router v7 |
| Mapping | Leaflet 1.9, React-Leaflet 5, OpenStreetMap, Google Satellite |
| Data format | GeoJSON |
| Data conversion | Python (pandas, json) |
| Deployment | Vercel |

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/pekanbaru-green-canopy.git
cd pekanbaru-green-canopy

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Converting Survey Data

```bash
pip install pandas openpyxl
python convert_excel_to_geojson.py
```

The script reads the cleaned CSV, maps each row to a GeoJSON `Feature` point with all survey attributes, and writes `public/data/trees.json` — which the Leaflet map loads automatically on startup.

---

## Team

**Kelompok 10 — Teknik Informatika, Politeknik Caltex Riau**

| Name | Student ID | Role |
|---|---|---|
| M. Adib Al Jabrah | 2355301102 | Field survey coordination, data collection |
| Mohamad Haziq Dafren | 2355301119 | Website development, data visualisation |
| Muhammad Anwar Aziz | 2355301125 | GIS data processing, GeoJSON pipeline |
| Muhammad Arya | 2355301126 | Spatial analysis, map layer design |
| Fhadel Nouval Nudrian | 2355301072 | Field survey, data entry & cleaning |

**Supervisor:** Mardiah Fadli, S.T., M.T.
**Lab Instructor:** Ahmad Ali Munawar, S.T.

---

## Full Report

Full technical documentation (in Indonesian) is available in `dokumenSIG.pdf` — covers the research background, field survey methodology, data model design, web platform implementation, and spatial analysis findings in detail.

---

*GIS Project — TA 2025/2026 · Politeknik Caltex Riau*
