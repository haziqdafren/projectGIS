# 🌳 Pekanbaru Green Canopy

> Platform analisis spasial vegetasi dan pohon peneduh jalan untuk lingkungan perkotaan berkelanjutan di Kota Pekanbaru

![React](https://img.shields.io/badge/React-18.3.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Deskripsi Project

Website informatif dan interaktif untuk visualisasi dan edukasi tentang kondisi vegetasi dan pohon peneduh jalan di Kota Pekanbaru sebagai upaya mitigasi **Urban Heat Island (UHI)**. Project ini menganalisis:

- 🌳 **Jenis Pohon** - Identifikasi spesies dan taksonomi
- 📏 **Diameter Batang (DBH)** - Pengukuran diameter setinggi dada
- 💚 **Kondisi Pohon** - Penilaian kesehatan (Sehat, Rusak, Kering)
- 🌡️ **Suhu Permukaan** - Pengukuran dengan termometer portable
- ⭐ **Fungsi Ekologi** - Penilaian kontribusi mitigasi panas

## ✨ Fitur

### Saat Ini (Phase 1)
✅ **Halaman Home** - Landing page modern dengan statistik dan overview
✅ **Halaman About** - Edukasi tentang Urban Heat Island dan metodologi penelitian
✅ **Halaman Contact** - Form kontak dan informasi tim
✅ **Responsive Design** - Mobile-friendly untuk semua perangkat
✅ **Modern UI/UX** - Animasi smooth dengan Framer Motion

### Dalam Pengembangan (Phase 2)
🚧 **Peta Interaktif** - Visualisasi data spasial dengan Leaflet
🚧 **Filter & Layer Control** - Filter berdasarkan jenis, kondisi, diameter
🚧 **Heatmap Suhu** - Visualisasi distribusi suhu permukaan
🚧 **Dashboard Analytics** - Chart dan statistik mendalam

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/pekanbaru-green-canopy.git

# Masuk ke folder project
cd pekanbaru-green-canopy

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Website akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan)

### Build untuk Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library
- **Vite 5.0** - Build tool & dev server
- **React Router v6** - Client-side routing

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Mapping (Coming Soon)
- **Leaflet** - Interactive maps
- **React-Leaflet** - React components for Leaflet
- **Leaflet.heat** - Heatmap plugin
- **Leaflet.markercluster** - Marker clustering

## 📂 Project Structure

```
pekanbaru-green-canopy/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, styles
│   ├── components/      # React components
│   │   ├── common/      # Reusable components
│   │   ├── layout/      # Header, Footer
│   │   ├── home/        # Home-specific components
│   │   └── map/         # Map components (future)
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Maps.jsx
│   │   └── Contact.jsx
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## 🎨 Design System

### Color Palette

```js
Primary Green: #10b981 (Emerald-500)
Dark Green:    #047857 (Emerald-700)
Light Green:   #d1fae5 (Emerald-100)

Condition Colors:
- Healthy:  #22c55e (Green-500)
- Warning:  #eab308 (Yellow-500)
- Critical: #ef4444 (Red-500)

Temperature Gradient:
Cool → Warm: Blue → Green → Yellow → Red
```

### Typography

- **Headings**: Plus Jakarta Sans / Inter (bold, modern)
- **Body**: Inter (clean, readable)
- **Monospace**: System monospace (untuk data/koordinat)

## 🗺️ Roadmap

### Phase 1: Setup & Core Pages ✅ (Selesai)
- [x] Initialize React + Vite project
- [x] Setup Tailwind CSS
- [x] Create routing structure
- [x] Implement Home page
- [x] Implement About page
- [x] Create reusable components (Header, Footer)

### Phase 2: Map Integration 🚧 (In Progress)
- [ ] Integrate Leaflet map
- [ ] Implement layer controls
- [ ] Add marker clustering
- [ ] Create custom popups
- [ ] Implement filters

### Phase 3: Data Visualization
- [ ] Load KML/GeoJSON data
- [ ] Implement heatmap
- [ ] Create Analytics dashboard (charts)
- [ ] Add statistics calculations

### Phase 4: Polish & Deploy
- [ ] Animations & transitions optimization
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deploy to Vercel/Netlify

### Future Enhancements
- [ ] User authentication
- [ ] Crowdsourcing data (user submit pohon baru)
- [ ] Backend API (Laravel/Node.js)
- [ ] Database (PostgreSQL + PostGIS)
- [ ] Mobile app (React Native)

## 📊 Data Structure

Data pohon akan disimpan dalam format GeoJSON/KML dengan struktur:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [101.4500, 0.5333]
  },
  "properties": {
    "id": "PKU001",
    "species": "Angsana",
    "diameter": 45.5,
    "condition": "Sehat",
    "temperature": 28.5,
    "ecological_score": 4.5,
    "location": "Jl. Sudirman",
    "survey_date": "2024-11-30"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Untuk berkontribusi:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 👥 Tim

**Institusi**: Politeknik Caltex Riau
**Program Studi**: Teknik Geomatika
**Periode**: November 2024 - Januari 2025

### Kolaborator
- Dinas Lingkungan Hidup Kota Pekanbaru
- Badan Perencanaan Pembangunan Daerah
- Universitas Riau - Fakultas Kehutanan

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Email**: info@pekanbarugreencanopy.com
**Website**: [Coming Soon]
**Location**: Politeknik Caltex Riau, Pekanbaru, Riau

---

<p align="center">
  Dikembangkan dengan ❤️ untuk lingkungan yang lebih hijau
</p>

<p align="center">
  <strong>Pekanbaru Green Canopy © 2024</strong>
</p>
