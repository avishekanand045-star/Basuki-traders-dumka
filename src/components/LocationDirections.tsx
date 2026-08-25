import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Footprints, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Compass,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { STORE_INFO, DUMKA_LANDMARKS } from '../data/storeData';
import { getDirectionsUrl, getGoogleMapsUrl, createWhatsAppLink } from '../utils/storeUtils';

export const LocationDirections: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState(0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleNavigateGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(STORE_INFO.address)}`;
          window.open(url, '_blank');
        },
        () => {
          window.open(getDirectionsUrl(STORE_INFO.address), '_blank');
        }
      );
    } else {
      window.open(getDirectionsUrl(STORE_INFO.address), '_blank');
    }
  };

  return (
    <section id="location" className="py-16 sm:py-20 bg-[#0F1622] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Store Location & Directions</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Visit BASUKI <span className="luxury-gradient-text">TRADERS</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Centrally located on Kuldeep Singh Road, Dumka, Jharkhand. Convenient access with ample parking for two-wheelers and four-wheelers.
          </p>
        </div>

        {/* Distance & Travel Metrics Strip directly matching prompt: 2.6 km · 10 mins · 37 mins */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Central Distance</p>
              <h3 className="font-cinzel text-xl font-bold text-slate-100 font-mono">2.6 km</h3>
              <p className="text-[11px] text-amber-400/90">From Dumka Town Center</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Drive / Bike Time</p>
              <h3 className="font-cinzel text-xl font-bold text-slate-100 font-mono">10 mins</h3>
              <p className="text-[11px] text-blue-300">Smooth road connectivity</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Walking Time</p>
              <h3 className="font-cinzel text-xl font-bold text-slate-100 font-mono">37 mins</h3>
              <p className="text-[11px] text-emerald-300">Through main market avenue</p>
            </div>
          </div>
        </div>

        {/* Map & Landmark directions 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Map Representation Card */}
          <div className="lg:col-span-7 bg-[#101726] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-black">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Interactive Map of BASUKI TRADERS
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Location
                </span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-slate-100">
                Kuldeep Singh Rd, Dumka (814101)
              </h3>
            </div>

            {/* Stylized Google Map Frame */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner group">
              {/* Embedded Google Maps iframe for Dumka */}
              <iframe
                title="Map of BASUKI TRADERS, Dumka"
                src="https://maps.google.com/maps?q=Kuldeep+Singh+Road,+Dumka,+Jharkhand+814101&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />

              {/* Center Map Pin Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0B0F17]/90 backdrop-blur-md border border-amber-500/40 text-xs shadow-xl pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                  <span className="font-bold text-amber-300">BASUKI TRADERS</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">Kuldeep Singh Rd, Dumka</p>
              </div>
            </div>

            {/* Address bar & Copy */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-slate-200">{STORE_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons for Map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleNavigateGPS}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Start GPS Navigation</span>
              </button>

              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-amber-500/30 transition-all"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Directions from Key Dumka Landmarks */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="font-cinzel text-xl font-bold text-slate-100">
                  Directions in Dumka
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Easy approach routes from major transit hubs in Dumka:
              </p>

              {/* Landmarks List */}
              <div className="space-y-3">
                {DUMKA_LANDMARKS.map((landmark, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLandmark(idx)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedLandmark === idx
                        ? 'bg-amber-950/30 border-amber-500/60 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-xs text-slate-200">
                        {landmark.name}
                      </h4>
                      <span className="text-[11px] font-mono text-amber-400 font-bold">
                        {landmark.distance} • {landmark.driveTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {landmark.routeTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Call & WhatsApp helper card */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs text-slate-400">
                <span>Need help locating the store? Call us directly:</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-amber-500/30"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {STORE_INFO.phone}</span>
                </a>
                <a
                  href={createWhatsAppLink("Hello Basuki Traders, I am on my way to your Kuldeep Singh Rd store. Could you please send your exact live location?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Get Location</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
