# 🚀 Quick Start Guide - Pekanbaru Green Canopy

## ✅ Status: READY TO USE!

Development server is running at: **http://localhost:5174/**

---

## 📱 Cara Mengakses Website

1. **Buka browser** (Chrome, Firefox, Safari, Edge)
2. **Ketik URL:** `http://localhost:5174/`
3. **Selesai!** Website sudah bisa diakses

---

## 🗂️ Navigasi Website

Website memiliki 4 halaman:

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| **Beranda** | `/` | Landing page dengan overview statistik & UHI info |
| **Tentang** | `/about` | Edukasi lengkap tentang penelitian & metodologi |
| **Peta** | `/maps` | Placeholder untuk peta interaktif (Phase 2) |
| **Kontak** | `/contact` | Form kontak & informasi tim |

---

## 🎨 Fitur yang Sudah Berfungsi

### Halaman Beranda (`/`)
✅ Hero section dengan tagline "Menuju Pekanbaru Hijau dan Sejuk"
✅ 4 Statistics cards dengan animasi:
   - Total Pohon Terdata: 1,250
   - Jenis Pohon: 45
   - Penurunan Suhu: 3.2°C
   - Area Terlindungi: 125 km²
✅ Section "Mengapa Ini Penting?" tentang Urban Heat Island
✅ 4 Manfaat ekologi pohon
✅ Call-to-action button ke peta
✅ Smooth scroll animations

### Halaman Tentang (`/about`)
✅ Penjelasan Urban Heat Island phenomenon
✅ 4 Tujuan penelitian
✅ Metodologi 4 langkah:
   - Survei Lapangan
   - Pengukuran Atribut
   - Pengukuran Suhu
   - Analisis Data
✅ 6 Parameter yang diukur
✅ Informasi tim & kolaborator

### Halaman Kontak (`/contact`)
✅ Form kontak (Nama, Email, Subjek, Pesan)
✅ Informasi kontak (Alamat, Email, Telepon)
✅ Jam operasional

### Layout Global
✅ Header responsif (desktop + mobile menu)
✅ Footer dengan quick links & social media
✅ Active route highlighting
✅ Smooth transitions

---

## 🛠️ Command Cheat Sheet

```bash
# Start development server
npm run dev

# Stop server
# Press Ctrl+C in terminal

# Build for production
npm run build

# Preview production build
npm run preview

# Install new dependencies
npm install <package-name>
```

---

## 📝 Cara Edit Konten

### Edit Statistik di Home Page
**File:** `src/pages/Home.jsx`
**Line:** 11-16

```javascript
const stats = [
  { label: 'Total Pohon Terdata', value: '1,250', ... },
  { label: 'Jenis Pohon', value: '45', ... },
  { label: 'Penurunan Suhu', value: '3.2°C', ... },
  { label: 'Area Terlindungi', value: '125 km²', ... },
];
```

### Edit Contact Info
**File:** `src/components/layout/Footer.jsx`
**Line:** 61-83

### Edit Navigation Menu
**File:** `src/components/layout/Header.jsx`
**Line:** 6-11

---

## 🎨 Cara Ganti Warna

**File:** `tailwind.config.js`

```javascript
colors: {
  primary: {
    500: '#10b981', // Main green color
    600: '#059669', // Darker green
    700: '#047857', // Even darker
    // Edit nilai hex sesuai keinginan
  },
}
```

Setelah edit, save file → browser akan auto-refresh!

---

## 📱 Test Responsive Design

### Method 1: Browser DevTools
1. Buka website
2. Tekan `F12` atau `Cmd+Option+I` (Mac)
3. Klik icon device toolbar (📱)
4. Pilih device: iPhone, iPad, dll

### Method 2: Resize Browser
Drag tepi browser untuk lihat perubahan layout

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🚨 Troubleshooting

### Server tidak jalan?
```bash
# Stop semua proses
# Ctrl+C di terminal

# Jalankan ulang
npm run dev
```

### Error saat install?
```bash
# Hapus node_modules
rm -rf node_modules

# Install ulang
npm install
```

### Port 5174 sudah dipakai?
Vite akan otomatis cari port lain (5175, 5176, dst)
Cek terminal untuk melihat port yang digunakan

### Styling tidak muncul?
1. Pastikan `tailwind.config.js` ada
2. Check `postcss.config.js` ada
3. Restart dev server

---

## 📂 File Structure (Yang Penting)

```
pekanbaru-green-canopy/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Edit konten home di sini
│   │   ├── About.jsx         # Edit konten about di sini
│   │   └── Contact.jsx       # Edit form kontak di sini
│   ├── components/layout/
│   │   ├── Header.jsx        # Edit navbar di sini
│   │   └── Footer.jsx        # Edit footer di sini
│   ├── App.jsx               # Main routing
│   └── index.css             # Global styles
├── public/                   # Taruh images/data di sini
├── tailwind.config.js        # Config warna & theme
└── package.json              # Dependencies list
```

---

## 🎯 Next Steps untuk Phase 2

Setelah data spasial ready:

1. **Install Leaflet:**
   ```bash
   npm install leaflet react-leaflet leaflet.markercluster leaflet.heat
   ```

2. **Prepare Data:**
   - Convert KML → GeoJSON
   - Simpan di `public/data/trees.geojson`

3. **Implement Maps Page:**
   - Saya bisa bantu implement peta interaktif
   - Filter controls
   - Heatmap
   - Popups

---

## 💡 Tips

1. **Auto-Save:** VS Code auto-save → browser auto-refresh. Super fast!

2. **Multiple Pages Open:** Bisa buka beberapa tab untuk compare pages

3. **Console Errors:** Press F12 → Console tab untuk lihat errors

4. **Git Backup:**
   ```bash
   git add .
   git commit -m "Phase 1 complete"
   ```

5. **Screenshot:** Ambil screenshot setiap halaman untuk documentation

---

## 📞 Need Help?

Kalau ada kendala:
1. Check terminal untuk error messages
2. Check browser console (F12)
3. Read `DEVELOPMENT_SUMMARY.md` untuk detail lengkap
4. Read `PROJECT_PLAN.md` untuk roadmap

---

## ✨ What's Working Right Now

✅ **100% Responsive** - Mobile, tablet, desktop
✅ **Modern Design** - Gradient, animations, hover effects
✅ **Fast Loading** - Vite HMR, optimized bundle
✅ **Clean Code** - Organized structure, reusable components
✅ **Documentation** - Complete guides & comments

---

**Server Status:** 🟢 **RUNNING**
**URL:** http://localhost:5174/
**Status:** Phase 1 Complete ✅

---

*Last Updated: 1 Desember 2024*
*Framework: React 18.3 + Vite 5.0 + Tailwind CSS 3.4*
