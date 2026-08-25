import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Crown, 
  MessageSquare, 
  Navigation, 
  ShieldCheck, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getDirectionsUrl, createWhatsAppLink } from '../utils/storeUtils';

interface FooterProps {
  onNavClick: (id: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenBooking,
}) => {
  return (
    <footer className="bg-[#070A0F] border-t border-amber-900/30 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0B0F17] rounded-[7px] flex items-center justify-center">
                  <span className="font-cinzel text-amber-400 font-bold text-lg">BT</span>
                </div>
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-lg text-slate-100">
                  BASUKI TRADERS
                </h3>
                <p className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider">
                  Men's Clothing & Bespoke Fashion • Dumka
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dumka's premier menswear fashion showroom and master tailoring studio. Serving Santhal Pargana with authentic fabrics, royal groom sherwanis, and executive suits.
            </p>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-100">5.0 Star Rating</span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] text-amber-400">14 Verified Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-slate-200 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'overview', label: 'Store Overview' },
                { id: 'collections', label: 'Men\'s Catalog' },
                { id: 'stylist', label: 'AI Style Advisor' },
                { id: 'gallery', label: 'Photos & Gallery' },
                { id: 'reviews', label: 'Customer Reviews' },
                { id: 'location', label: 'Directions & Map' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Store Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-slate-200 uppercase tracking-wider">
              Specialized Collections
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Wedding Groom Sherwanis & Safas</li>
              <li>• Executive 2-Piece & 3-Piece Suits</li>
              <li>• Pure Giza Cotton & Linen Shirts</li>
              <li>• Modi & Nehru Bandi Jackets</li>
              <li>• Festive Chanderi Kurta-Pyjamas</li>
              <li>• Auspicious Puja Dhotis & Stoles</li>
              <li>• Master Bespoke Alteration Service</li>
            </ul>
          </div>

          {/* Col 4: Store Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel font-bold text-sm text-slate-200 uppercase tracking-wider">
              Visit Showroom
            </h4>

            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </p>

              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-amber-300 font-mono font-bold">
                  {STORE_INFO.phone}
                </a>
              </p>

              <p className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{STORE_INFO.openingHours.formatted} (All 7 Days)</span>
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Book Tailor Fitting Appointment
              </button>

              <a
                href={getDirectionsUrl(STORE_INFO.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} BASUKI TRADERS, Dumka. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Quality Guarantee
            </span>
            <span>•</span>
            <span>Kuldeep Singh Rd, Dumka (814101)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
