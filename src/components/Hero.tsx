import React from 'react';
import { 
  Star, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Crown,
  Scissors
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { createWhatsAppLink } from '../utils/storeUtils';

interface HeroProps {
  onExploreCollections: () => void;
  onOpenStylist: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollections,
  onOpenStylist,
  onOpenBooking,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#070A0F] via-[#0B0F17] to-[#0F1622] pt-12 pb-24 sm:pt-16 sm:pb-28">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-amber-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Brand, Rating & Pitch */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* 5.0 Google Rating Pill directly matching prompt: 5.0(14) ‧ Men's clothing store in Dumka, Jharkhand ‧ Open */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 pr-4 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
              <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>5.0</span>
              </div>
              <span className="font-semibold text-amber-300">(14 Reviews)</span>
              <span className="text-amber-500/60">•</span>
              <span className="text-slate-300 font-medium">Men's Clothing Store in Dumka, Jharkhand</span>
              <span className="text-amber-500/60">•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Open
              </span>
            </div>

            {/* Main Grand Title */}
            <div className="space-y-2">
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-400 font-semibold">
                Kuldeep Singh Road • Dumka
              </p>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-tight">
                BASUKI <span className="luxury-gradient-text">TRADERS</span>
              </h1>
              <p className="font-playfair italic text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0">
                The Sovereign Men's Fashion & Bespoke Tailoring Destination in Santhal Pargana.
              </p>
            </div>

            {/* Subtext description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into Dumka's most celebrated boutique for royal wedding sherwanis, executive Italian cut suits, pure Giza cotton shirts, festive kurta-jackets, and master hand-tailoring.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Wedding & Groom Specialist
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                <Scissors className="w-3.5 h-3.5 text-amber-400" />
                Custom Tailoring & Alteration
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Genuine Fabrics
              </span>
            </div>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreCollections}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/60 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>View Collections & Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-stylist-btn"
                onClick={onOpenStylist}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Style Advisor</span>
              </button>

              <a
                id="hero-call-btn"
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium text-sm flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual & Store Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-800 rounded-3xl opacity-30 blur-lg" />

              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1000&q=80"
                  alt="Basuki Traders Men's Royal Ethnic Wear Dumka"
                  className="w-full h-[400px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/20" />

                {/* Floating Store Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F17]/90 backdrop-blur-md border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-cinzel font-bold text-amber-300 text-sm">BASUKI TRADERS</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                          DUMKA
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        Kuldeep Singh Rd, Dumka (814101)
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-400 justify-end">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-sm">5.0</span>
                      </div>
                      <p className="text-[10px] text-slate-400">14 Verified Ratings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating feature pill */}
              <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 animate-bounce">
                <Crown className="w-3.5 h-3.5" />
                <span>Dumka's #1 Men's Boutique</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
