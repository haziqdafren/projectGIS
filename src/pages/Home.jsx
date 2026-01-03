import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TreeDeciduous,
  ThermometerSun,
  MapPin,
  ArrowRight,
  Leaf,
  Wind,
  Droplets,
  Heart,
} from 'lucide-react';

const stats = [
  { label: 'Total Pohon Terdata', value: '106', icon: TreeDeciduous, color: 'text-green-600' },
  { label: 'Jenis Pohon', value: '5', icon: Leaf, color: 'text-emerald-600' },
  { label: 'Penurunan Suhu', value: '3.2°C', icon: ThermometerSun, color: 'text-blue-600' },
  { label: 'Area Terlindungi', value: '125 km²', icon: MapPin, color: 'text-purple-600' },
];

const benefits = [
  {
    icon: ThermometerSun,
    title: 'Mitigasi Panas Urban',
    description: 'Mengurangi efek Urban Heat Island hingga 3-5°C di area teduh',
  },
  {
    icon: Wind,
    title: 'Kualitas Udara',
    description: 'Menyerap CO₂ dan menghasilkan oksigen untuk udara lebih bersih',
  },
  {
    icon: Droplets,
    title: 'Manajemen Air',
    description: 'Mengurangi limpasan air hujan dan meningkatkan resapan tanah',
  },
  {
    icon: Heart,
    title: 'Kesejahteraan Mental',
    description: 'Meningkatkan kenyamanan dan kesehatan mental warga',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-emerald-50 to-green-50 pt-32 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-700 shadow-sm">
                <Leaf className="w-4 h-4" />
                Platform Analisis Vegetasi Perkotaan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 leading-tight"
            >
              Menuju{' '}
              <span className="text-gradient">Pekanbaru Hijau</span>{' '}
              dan Sejuk
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto"
            >
              Analisis spasial vegetasi dan pohon peneduh jalan untuk
              lingkungan perkotaan yang berkelanjutan
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/maps" className="btn-primary inline-flex items-center gap-2">
                Jelajahi Peta
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary inline-flex items-center gap-2">
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="card text-center hover:border-primary-200 border-2 border-transparent"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary-100 p-4 rounded-2xl">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                Mengapa Ini Penting?
              </h2>
              <p className="text-xl text-slate-600">
                Kota Pekanbaru menghadapi tantangan Urban Heat Island yang
                semakin meningkat. Pohon peneduh jalan berperan vital dalam
                mitigasi panas perkotaan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-12 border-2 border-red-100"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-xl">
                  <ThermometerSun className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-slate-900 mb-2">
                    Urban Heat Island Effect
                  </h3>
                  <p className="text-slate-600">
                    Fenomena peningkatan suhu di area perkotaan dibandingkan
                    area sekitarnya
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/70 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    +5°C
                  </div>
                  <div className="text-sm text-slate-600">
                    Peningkatan suhu di area padat bangunan
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    30%
                  </div>
                  <div className="text-sm text-slate-600">
                    Peningkatan konsumsi energi AC
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    15%
                  </div>
                  <div className="text-sm text-slate-600">
                    Risiko heat stroke meningkat
                  </div>
                </div>
              </div>

              <p className="text-slate-700 italic">
                💡 Pohon peneduh dapat menurunkan suhu permukaan hingga 3-5°C
                dan meningkatkan kualitas hidup warga kota.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Manfaat Pohon Peneduh Jalan
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kontribusi ekologi pohon untuk lingkungan perkotaan yang lebih
              sehat dan nyaman
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="card group hover:border-primary-200 border-2 border-transparent"
              >
                <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-emerald-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Siap Menjelajahi Data Vegetasi Pekanbaru?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Akses peta interaktif dan visualisasi data pohon peneduh jalan di
              seluruh Kota Pekanbaru
            </p>
            <Link
              to="/maps"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-4 px-8 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
            >
              Buka Peta Interaktif
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
