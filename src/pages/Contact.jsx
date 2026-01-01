import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-primary-50 via-emerald-50 to-green-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-slate-900 mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-slate-600">
              Ada pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-display font-bold text-3xl text-slate-900 mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Alamat</h3>
                    <p className="text-slate-600">
                      Politeknik Caltex Riau<br />
                      Jl. Umbansari No. 1, Rumbai<br />
                      Pekanbaru, Riau 28265
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@pekanbarugreencanopy.com"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      info@pekanbarugreencanopy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Telepon</h3>
                    <p className="text-slate-600">+62 761 53939</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Jam Operasional
                </h3>
                <p className="text-slate-600 text-sm">
                  Senin - Jumat: 08:00 - 16:00 WIB<br />
                  Sabtu - Minggu: Tutup
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display font-bold text-3xl text-slate-900 mb-6">
                Kirim Pesan
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Perihal pesan Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
