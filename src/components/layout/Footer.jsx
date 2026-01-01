import { Link } from 'react-router-dom';
import { TreeDeciduous, Mail, MapPin, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <TreeDeciduous className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-tight">
                  Pekanbaru Green Canopy
                </span>
                <span className="text-xs text-primary-400 font-semibold">
                  Urban Forest Analysis
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-4">
              Platform analisis spasial vegetasi dan pohon peneduh jalan untuk
              mendukung lingkungan perkotaan berkelanjutan di Kota Pekanbaru.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/maps" className="hover:text-primary-400 transition-colors">
                  Peta Interaktif
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Politeknik Caltex Riau, Pekanbaru, Riau</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@pekanbarugreencanopy.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  info@pekanbarugreencanopy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center text-slate-400">
          <p>
            © {currentYear} Pekanbaru Green Canopy. Dikembangkan dengan ❤️ untuk
            lingkungan yang lebih hijau.
          </p>
        </div>
      </div>
    </footer>
  );
}
