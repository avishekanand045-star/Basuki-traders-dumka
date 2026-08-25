import React from 'react';
import { 
  Crown, 
  Scissors, 
  Sparkles, 
  Award, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Shirt, 
  HeartHandshake,
  MapPin,
  Phone,
  CalendarCheck
} from 'lucide-react';
import { STORE_INFO, STORE_HIGHLIGHTS } from '../data/storeData';
import { getLiveStoreStatus } from '../utils/storeUtils';

interface OverviewSectionProps {
  onOpenBooking: () => void;
  onExploreCollections: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onOpenBooking,
  onExploreCollections,
}) => {
  const timeStatus = getLiveStoreStatus();

  return (
    <section id="overview" className="py-16 sm:py-20 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>Store Overview & Heritage</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Elegance Crafted For The <span className="luxury-gradient-text">Distinguished Man</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Situated prominently on <strong className="text-slate-200">Kuldeep Singh Road in Dumka</strong>, BASUKI TRADERS has established itself as the trusted premier destination for refined men's wardrobe, royal ethnic ceremonies, business attire, and master artisan tailoring.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STORE_HIGHLIGHTS.map((item, idx) => {
            const icons = {
              Crown: <Crown className="w-6 h-6 text-amber-400" />,
              Scissors: <Scissors className="w-6 h-6 text-amber-400" />,
              Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
              Award: <Award className="w-6 h-6 text-amber-400" />,
            };

            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                  {icons[item.icon as keyof typeof icons] || <Sparkles className="w-6 h-6 text-amber-400" />}
                </div>
                <h3 className="font-cinzel font-bold text-base text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: About & Craftsmanship Story */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/90 to-[#101726] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-100">
                  About BASUKI TRADERS
                </h3>
                <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                  5.0 ★ Rated Men's Fashion Hub • Dumka, Jharkhand
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Est. Dumka
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              At Basuki Traders, we believe every man deserves clothing that commands respect and embodies confidence. Whether you are dressing for your sacred wedding vows, a critical corporate conference, or an auspicious family festival like Chhath or Diwali, our curated collections bridge timeless Indian heritage with sharp contemporary styling.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Exclusive Wedding Groom Sherwani & Safa sets',
                'Imported & Indian fine suiting fabrics (Raymond, Siyaram, Linen)',
                '100% Giza Egyptian long-staple cotton shirts',
                'Festive Chanderi & Raw Silk Kurta-Pyjamas',
                'Modi & Nehru Bandi jackets in brocade and matte textures',
                'Complimentary precision tailoring & iron-pressed delivery',
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Action Bar inside About */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-950"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book Store Fitting Session</span>
              </button>
              <button
                onClick={onExploreCollections}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                <span>Browse All Collections</span>
              </button>
            </div>
          </div>

          {/* Right: Operational Details, Timing & Amenities */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
            {/* Store Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-400" />
                <h4 className="font-cinzel font-bold text-lg text-slate-100">Store Hours & Schedule</h4>
              </div>

              <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Monday – Sunday:</span>
                  <span className="font-bold text-slate-100 font-mono">9:30 AM – 7:30 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Status:</span>
                  <span className={`px-2 py-0.5 rounded font-semibold border ${timeStatus.badgeColor}`}>
                    {timeStatus.statusText}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Verification:</span>
                  <span className="text-amber-400/90 font-medium">{STORE_INFO.confirmedInfo}</span>
                </div>
              </div>
            </div>

            {/* Store Amenities & Payment */}
            <div className="space-y-3">
              <h4 className="font-cinzel font-bold text-sm text-slate-200">Showroom Amenities</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-amber-400" />
                  <span>Private Trial Room</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-400" />
                  <span>In-House Tailor</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>UPI, Cards & Cash</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>Free Alterations</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-amber-400 font-semibold uppercase">Need Assistance?</p>
                <p className="text-sm font-bold text-slate-100 font-mono">{STORE_INFO.phone}</p>
              </div>
              <a
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
