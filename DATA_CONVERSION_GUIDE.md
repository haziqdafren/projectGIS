# 📊 Panduan Konversi Data - Excel/ArcMap ke GeoJSON

## Format Data Excel Anda

Berdasarkan struktur Excel yang Anda berikan:

| No | Jenis Pohon | Koordinat X | Koordinat Y | Diameter Pohon | Kondisi Pohon | Suhu Sekitar | Jumlah Pohon |
|----|-------------|-------------|-------------|----------------|---------------|--------------|--------------|
| 1  | Bintaro     | 101.452758  | 0.524792    | 29.9363057324841 cm | sehat    | 24 C   | 1 |
| 2  | Bintaro     | 101.452758  | 0.524792    | 39.4904458598726 cm | sehat    | 24 C   | 1 |

---

## 🎯 Target Format GeoJSON

Website ini menggunakan format **GeoJSON** standard yang compatible dengan Leaflet dan kebanyakan GIS software.

### Contoh Format Target:

```json
{
  "type": "FeatureCollection",
  "name": "Pohon Peneduh Pekanbaru",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "id": "PKU001",
      "geometry": {
        "type": "Point",
        "coordinates": [101.452758, 0.524792]
      },
      "properties": {
        "id": "PKU001",
        "species": "Bintaro",
        "diameter": 29.94,
        "condition": "Sehat",
        "temperature": 24,
        "location": "Jl. [Nama Jalan]",
        "district": "Pekanbaru Kota",
        "survey_date": "2024-11-30",
        "ecological_score": 4.5,
        "notes": ""
      }
    }
  ]
}
```

---

## 🔄 Metode Konversi: 3 Cara

### **Method 1: ArcGIS/ArcMap (RECOMMENDED)**

**Langkah-langkah:**

1. **Import Excel ke ArcMap/ArcGIS Pro**
   ```
   File → Add Data → Add XY Data
   - X Field: Koordinat X
   - Y Field: Koordinat Y
   - Coordinate System: WGS 1984 (EPSG:4326)
   ```

2. **Export ke GeoJSON**
   ```
   Right-click layer → Data → Export Features
   - Format: GeoJSON
   - Output location: public/data/trees.json
   ```

3. **Field Mapping**
   Pastikan field names sesuai:
   ```
   Excel Column          →  GeoJSON Property
   ------------------       -------------------
   No                   →  id (format: PKU001, PKU002, etc)
   Jenis Pohon          →  species
   Koordinat X          →  geometry.coordinates[0]
   Koordinat Y          →  geometry.coordinates[1]
   Diameter Pohon       →  diameter (remove " cm", convert to number)
   Kondisi Pohon        →  condition (capitalize: "sehat" → "Sehat")
   Suhu Sekitar         →  temperature (remove " C", convert to number)
   Jumlah Pohon         →  (optional, bisa di properties)
   ```

4. **Field Calculator untuk ID**
   ```python
   # Buat field "id" dengan format PKU001, PKU002, etc
   "PKU" + str(!OBJECTID!).zfill(3)
   ```

---

### **Method 2: Python Script (Advanced)**

Saya buatkan Python script untuk konversi otomatis:

```python
import pandas as pd
import json

# Read Excel
df = pd.read_excel('data_pohon.xlsx')

# Create GeoJSON structure
geojson = {
    "type": "FeatureCollection",
    "name": "Pohon Peneduh Pekanbaru",
    "crs": {
        "type": "name",
        "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
    },
    "features": []
}

# Convert each row
for idx, row in df.iterrows():
    # Clean diameter (remove " cm" and convert to float)
    diameter_str = str(row['Diameter Pohon']).replace(' cm', '').replace(',', '.')
    diameter = float(diameter_str) if diameter_str else 30.0

    # Clean temperature (remove " C")
    temp_str = str(row['Suhu Sekitar']).replace(' C', '').replace('°C', '')
    temperature = float(temp_str) if temp_str else 28.0

    # Capitalize condition
    condition = str(row['Kondisi Pohon']).capitalize()
    if condition.lower() == 'sehat':
        condition = 'Sehat'
    elif condition.lower() == 'rusak':
        condition = 'Rusak'
    elif condition.lower() == 'kering':
        condition = 'Kering'

    # Create feature
    feature = {
        "type": "Feature",
        "id": f"PKU{str(idx+1).zfill(3)}",
        "geometry": {
            "type": "Point",
            "coordinates": [
                float(row['Koordinat X']),
                float(row['Koordinat Y'])
            ]
        },
        "properties": {
            "id": f"PKU{str(idx+1).zfill(3)}",
            "species": str(row['Jenis Pohon']),
            "diameter": round(diameter, 2),
            "condition": condition,
            "temperature": temperature,
            "ecological_score": calculate_eco_score(diameter, condition),
            "location": "Pekanbaru",  # Update dengan data aktual
            "district": "Pekanbaru Kota",
            "survey_date": "2024-12-01",
            "surveyor": "Tim PCR",
            "notes": ""
        }
    }

    geojson["features"].append(feature)

# Function to calculate ecological score
def calculate_eco_score(diameter, condition):
    """
    Calculate ecological score (1-5) based on diameter and condition
    """
    # Base score from diameter
    if diameter < 20:
        base_score = 2.0
    elif diameter < 40:
        base_score = 3.5
    elif diameter < 60:
        base_score = 4.5
    else:
        base_score = 5.0

    # Adjust based on condition
    if condition == "Sehat":
        multiplier = 1.0
    elif condition == "Rusak":
        multiplier = 0.7
    else:  # Kering
        multiplier = 0.4

    return round(base_score * multiplier, 1)

# Save to JSON
with open('trees.json', 'w', encoding='utf-8') as f:
    json.dump(geojson, f, indent=2, ensure_ascii=False)

print(f"✅ Converted {len(geojson['features'])} trees to GeoJSON")
```

**Cara Pakai:**
```bash
# Install pandas
pip install pandas openpyxl

# Run script
python convert_excel_to_geojson.py

# Output: trees.json
# Copy ke: public/data/trees.json
```

---

### **Method 3: QGIS (Free & Easy)**

1. **Open QGIS**

2. **Import Excel as CSV**
   ```
   Layer → Add Layer → Add Delimited Text Layer
   - File: data_pohon.xlsx (save as CSV first)
   - X field: Koordinat X
   - Y field: Koordinat Y
   - CRS: EPSG:4326 (WGS 84)
   ```

3. **Export to GeoJSON**
   ```
   Right-click layer → Export → Save Features As
   - Format: GeoJSON
   - Filename: trees.json
   - CRS: EPSG:4326
   ```

---

## 📋 Checklist Sebelum Export

Pastikan data sudah:

- ✅ **Koordinat Valid** - X (Longitude): ~101.xx, Y (Latitude): ~0.xx
- ✅ **Diameter Clean** - Numeric only, no "cm" text
- ✅ **Suhu Clean** - Numeric only, no "C" or "°C"
- ✅ **Kondisi Standardized** - Hanya: "Sehat", "Rusak", atau "Kering"
- ✅ **ID Unique** - Setiap pohon punya ID unik (PKU001, PKU002, etc)
- ✅ **CRS Correct** - WGS 84 (EPSG:4326)

---

## 🗂️ Field Mapping Detail

### Required Fields (Wajib):

| Excel Column | GeoJSON Property | Type | Example | Notes |
|-------------|------------------|------|---------|-------|
| Koordinat X | coordinates[0] | float | 101.452758 | Longitude (X) |
| Koordinat Y | coordinates[1] | float | 0.524792 | Latitude (Y) |
| Jenis Pohon | species | string | "Bintaro" | Nama lokal |
| Diameter Pohon | diameter | float | 29.94 | Dalam cm (numeric only) |
| Kondisi Pohon | condition | string | "Sehat" | "Sehat"/"Rusak"/"Kering" |
| Suhu Sekitar | temperature | float | 24.0 | Dalam °C (numeric only) |

### Optional Fields (Bisa ditambah):

| Field | Type | Example | Purpose |
|-------|------|---------|---------|
| species_latin | string | "Cerbera manghas" | Nama ilmiah |
| location | string | "Jl. Sudirman" | Nama jalan |
| district | string | "Pekanbaru Kota" | Kecamatan |
| survey_date | string | "2024-12-01" | Tanggal survey |
| surveyor | string | "Tim PCR" | Nama surveyor |
| ecological_score | float | 4.5 | Skor 1-5 |
| notes | string | "Perlu pemangkasan" | Catatan |
| photo_url | string | "images/PKU001.jpg" | Link foto |

---

## 🎯 Standardisasi Kondisi Pohon

**Pastikan kondisi hanya menggunakan 3 kategori ini:**

| Input (dari Excel) | Output (di GeoJSON) | Color Code |
|-------------------|---------------------|------------|
| sehat, Sehat, SEHAT, healthy | **Sehat** | 🟢 Green (#22c55e) |
| rusak, Rusak, RUSAK, damaged | **Rusak** | 🟡 Yellow (#eab308) |
| kering, Kering, KERING, dead, mati | **Kering** | 🔴 Red (#ef4444) |

---

## 📁 File Placement

Setelah konversi, simpan file di:

```
pekanbaru-green-canopy/
└── public/
    └── data/
        ├── trees.json              ← Data utama (PRODUCTION)
        ├── sample-trees.json       ← Sample data (DEMO)
        ├── latihan.kml            ← Backup KML
        └── masjid1.kml            ← Backup KML
```

---

## 🔧 Update Code untuk Load Data Baru

**File:** `src/pages/Maps.jsx`
**Line:** 63

Ganti dari:
```javascript
const response = await fetch('/data/sample-trees.json');
```

Ke:
```javascript
const response = await fetch('/data/trees.json');
```

**That's it!** Website akan otomatis load data baru.

---

## ✅ Testing Checklist

Setelah data di-import:

1. ✅ Buka http://localhost:5174/maps
2. ✅ Check apakah semua marker muncul
3. ✅ Click marker → popup harus muncul
4. ✅ Test filter "Sehat", "Rusak", "Kering"
5. ✅ Test search by nama pohon
6. ✅ Check statistik sidebar (Total, Sehat, Rusak, Kering)
7. ✅ Check warna marker sesuai kondisi
8. ✅ Check ukuran marker sesuai diameter

---

## 🐛 Common Issues & Fixes

### Issue 1: Marker Tidak Muncul
**Penyebab:** Koordinat terbalik (X/Y swapped)
**Fix:** Pastikan format: `[Longitude, Latitude]` → `[101.xx, 0.xx]`

### Issue 2: Warna Marker Salah
**Penyebab:** Kondisi tidak standar (lowercase/uppercase)
**Fix:** Gunakan: "Sehat", "Rusak", "Kering" (capitalize first letter)

### Issue 3: Popup Error
**Penyebab:** Missing required properties
**Fix:** Pastikan minimal ada: species, diameter, condition, temperature

### Issue 4: Search Tidak Kerja
**Penyebab:** Field `species` null atau undefined
**Fix:** Pastikan semua feature punya property `species`

---

## 📊 Example Output (Correct Format)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "PKU001",
      "geometry": {
        "type": "Point",
        "coordinates": [101.452758, 0.524792]
      },
      "properties": {
        "id": "PKU001",
        "species": "Bintaro",
        "species_latin": "Cerbera manghas",
        "diameter": 29.94,
        "condition": "Sehat",
        "temperature": 24,
        "ecological_score": 4.5,
        "location": "Jl. Sudirman",
        "district": "Pekanbaru Kota",
        "survey_date": "2024-11-30",
        "surveyor": "Tim PCR",
        "notes": "Pohon sehat, kanopi rapat"
      }
    },
    {
      "type": "Feature",
      "id": "PKU002",
      "geometry": {
        "type": "Point",
        "coordinates": [101.452758, 0.524792]
      },
      "properties": {
        "id": "PKU002",
        "species": "Bintaro",
        "diameter": 39.49,
        "condition": "Sehat",
        "temperature": 24,
        "ecological_score": 4.8,
        "location": "Jl. Sudirman",
        "district": "Pekanbaru Kota",
        "survey_date": "2024-11-30",
        "surveyor": "Tim PCR",
        "notes": ""
      }
    }
  ]
}
```

---

## 🚀 Quick Convert Script

Saya sudah siapkan Python script lengkap di file terpisah. Check:
- `convert_excel_to_geojson.py` (akan saya buat)

---

## 📞 Need Help?

Kalau ada kendala:
1. Check format JSON valid: https://jsonlint.com/
2. Validate GeoJSON: http://geojson.io/
3. Read error di browser console (F12)

---

**Summary:**
1. Export dari ArcMap/QGIS ke GeoJSON
2. Pastikan format properties sesuai
3. Save ke `public/data/trees.json`
4. Update code line 63 di Maps.jsx
5. Refresh browser → Done!

---

*Last Updated: 1 Desember 2024*
