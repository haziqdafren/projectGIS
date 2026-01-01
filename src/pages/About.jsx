import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Users,
  Lightbulb,
  MapPinned,
  Thermometer,
  Ruler,
  LeafyGreen,
  CheckCircle2,
  Layers,
  Filter,
  MapPin,
} from 'lucide-react';

const methodology = [
  {
    step: '1',
    title: 'Survei Lapangan',
    description: 'Pengumpulan data menggunakan Avenza Maps dengan GPS tracking presisi tinggi',
    icon: MapPinned,
  },
  {
    step: '2',
    title: 'Pengukuran Atribut',
    description: 'Pencatatan jenis pohon, diameter batang (DBH), dan kondisi fisik pohon',
    icon: Ruler,
  },
  {
    step: '3',
    title: 'Pengukuran Suhu',
    description: 'Pengukuran suhu permukaan sekitar pohon menggunakan termometer portable',
    icon: Thermometer,
  },
  {
    step: '4',
    title: 'Analisis Data',
    description: 'Pengolahan data spasial dan perhitungan fungsi ekologi pohon',
    icon: LeafyGreen,
  },
];

const objectives = [
  'Memetakan distribusi dan kondisi pohon peneduh jalan di Kota Pekanbaru',
  'Menganalisis fungsi ekologi pohon dalam mitigasi Urban Heat Island',
  'Menyediakan basis data terpadu untuk perencanaan ruang terbuka hijau',
  'Mendukung kebijakan pembangunan kota berkelanjutan berbasis data',
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-emerald-50 to-green-50 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-700 shadow-sm mb-6">
              <BookOpen className="w-4 h-4" />
              Tentang Penelitian
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-slate-900 mb-6">
              Analisis Spasial Vegetasi Perkotaan
            </h1>
            <p className="text-xl text-slate-600">
              Penelitian komprehensif tentang kondisi vegetasi dan pohon peneduh
              jalan untuk mendukung mitigasi panas perkotaan di Kota Pekanbaru
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-100 p-3 rounded-xl">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="font-display font-bold text-4xl text-slate-900">
                  Mengapa Ini Penting?
                </h2>
              </div>
              <div className="prose prose-lg">
                <p className="text-slate-600 mb-4">
                  <strong className="text-slate-900">Urban Heat Island (UHI)</strong> adalah
                  fenomena peningkatan suhu di kawasan perkotaan dibandingkan area
                  sekitarnya. Pekanbaru sebagai kota tropis mengalami dampak UHI yang
                  signifikan akibat:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>🏙️ Peningkatan area terbangun dan berkurangnya ruang terbuka hijau</li>
                  <li>🚗 Emisi kendaraan bermotor yang terus meningkat</li>
                  <li>🏭 Aktivitas industri dan komersial yang intensif</li>
                  <li>☀️ Paparan radiasi matahari yang tinggi sepanjang tahun</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Pohon peneduh jalan berperan <strong className="text-primary-600">vital</strong> dalam
                  mitigasi UHI melalui mekanisme evapotranspirasi, pembentukan bayangan,
                  dan peningkatan albedo permukaan.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-100"
            >
              <h3 className="font-bold text-2xl text-slate-900 mb-6">
                Dampak Urban Heat Island
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Thermometer className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Kesehatan Masyarakat</div>
                    <p className="text-sm text-slate-600">
                      Meningkatnya risiko heat stress, dehidrasi, dan penyakit terkait panas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Konsumsi Energi</div>
                    <p className="text-sm text-slate-600">
                      Peningkatan penggunaan AC hingga 30% untuk cooling
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Thermometer className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Kualitas Udara</div>
                    <p className="text-sm text-slate-600">
                      Pembentukan ozon troposfer dan polutan sekunder
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-primary-100 p-3 rounded-xl">
                <Lightbulb className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="font-display font-bold text-4xl text-slate-900">
                Tujuan Penelitian
              </h2>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-4">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-slate-700 text-lg">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6">
              Metodologi Penelitian
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pendekatan sistematis dalam pengumpulan dan analisis data vegetasi
              perkotaan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card group hover:border-primary-200 border-2 border-transparent">
                  <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Parameter Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 md:p-12"
          >
            <h3 className="font-bold text-2xl text-slate-900 mb-6 text-center">
              Parameter yang Diukur
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Jenis Pohon
                </div>
                <p className="text-sm text-slate-600">
                  Identifikasi spesies dan taksonomi pohon peneduh jalan
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Diameter Batang (DBH)
                </div>
                <p className="text-sm text-slate-600">
                  Pengukuran diameter setinggi dada (1.3m dari permukaan tanah)
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Kondisi Pohon
                </div>
                <p className="text-sm text-slate-600">
                  Penilaian kondisi fisik: Sehat, Rusak, atau Kering
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Suhu Permukaan
                </div>
                <p className="text-sm text-slate-600">
                  Pengukuran suhu sekitar pohon dengan termometer portable
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Lokasi GPS
                </div>
                <p className="text-sm text-slate-600">
                  Koordinat presisi untuk pemetaan spasial
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  Fungsi Ekologi
                </div>
                <p className="text-sm text-slate-600">
                  Skor kontribusi terhadap mitigasi panas urban
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spatial Analysis Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6">
              Analisis Spasial GIS
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pengolahan dan analisis data menggunakan ArcMap untuk menghasilkan visualisasi peta interaktif
            </p>
          </motion.div>

          {/* Data Processing Workflow */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="card group hover:border-primary-200 border-2 border-transparent">
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPinned className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  Survei Lapangan
                </h3>
                <p className="text-slate-600 text-sm">
                  Pengambilan data GPS dan atribut pohon menggunakan Avenza Maps
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="card group hover:border-primary-200 border-2 border-transparent">
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  Analisis ArcMap
                </h3>
                <p className="text-slate-600 text-sm">
                  Clip data ke area studi dan attribute query berdasarkan kondisi pohon
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="card group hover:border-primary-200 border-2 border-transparent">
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <Filter className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  Export Data
                </h3>
                <p className="text-slate-600 text-sm">
                  Konversi data ke format GeoJSON untuk visualisasi web
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="card group hover:border-primary-200 border-2 border-transparent">
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  4
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  Peta Interaktif
                </h3>
                <p className="text-slate-600 text-sm">
                  Visualisasi web dengan filter kondisi dan pencarian
                </p>
              </div>
            </motion.div>
          </div>

          {/* Features in Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl p-8 md:p-12"
          >
            <h3 className="font-bold text-2xl text-slate-900 mb-6 text-center">
              Fitur Peta Interaktif
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  🔍 Filter Kondisi Pohon
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Menampilkan pohon berdasarkan kondisi: Sehat, Rusak, atau Kering
                </p>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                  condition = 'Sehat'
                </code>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  🔎 Pencarian Data
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Cari pohon berdasarkan spesies, lokasi, atau ID pohon
                </p>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                  search: species, location, id
                </code>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-6">
                <div className="font-bold text-lg text-primary-700 mb-2">
                  🎨 Visualisasi Warna
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Marker berwarna sesuai kondisi pohon untuk identifikasi cepat
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-green-500 text-white px-2 py-1 rounded">Sehat</span>
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded">Rusak</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded">Kering</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-primary-100 p-3 rounded-xl">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="font-display font-bold text-4xl text-slate-900">
                Tim Peneliti
              </h2>
            </div>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Penelitian ini dilakukan oleh mahasiswa Politeknik Caltex Riau sebagai salah satu tugas akhir dari mata kuliah Sistem Informasi Geografis.
            </p>
            <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Harapannya agar mahasiswa dapat melakukan survei langsung, mendapatkan data spasial secara mandiri,
              serta menerapkan teknik analisis GIS dan memvisualisasikan data tersebut dalam bentuk peta interaktif berbasis web.
            </p>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md max-w-3xl mx-auto">
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-4">
                    Anggota Tim Peneliti
                  </h3>
                  <ul className="text-slate-600 space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold">•</span>
                      <span>M. Adib Al Jabrah (2355301102)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold">•</span>
                      <span>Mohamad Haziq Dafren (2355301119)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold">•</span>
                      <span>Muhammad Anwar Aziz (2355301125)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold">•</span>
                      <span>Muhammad Arya (2355301126)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold">•</span>
                      <span>Fhadel Nouval Nudrian (2355301072)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
