import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Shirt, 
  Crown, 
  Scissors, 
  MessageSquare, 
  CheckCircle2, 
  RefreshCw, 
  Compass,
  Layers,
  Footprints
} from 'lucide-react';
import { StylistOutfit } from '../types';
import { STORE_INFO } from '../data/storeData';
import { createWhatsAppLink } from '../utils/storeUtils';
import confetti from 'canvas-confetti';

export const AiStylistAdvisor: React.FC = () => {
  const [occasion, setOccasion] = useState('Wedding / Groom Attire');
  const [stylePreference, setStylePreference] = useState('Royal Heritage & Indo-Western');
  const [fabric, setFabric] = useState('Raw Silk & Jacquard Brocade');
  const [budget, setBudget] = useState('₹5,000 – ₹15,000 (Premium Luxury)');
  const [heightFit, setHeightFit] = useState('Tailored Athletic / Regular Fit');

  const [loading, setLoading] = useState(false);
  const [outfitResult, setOutfitResult] = useState<StylistOutfit | null>(null);

  const occasionsList = [
    'Wedding / Groom Attire',
    'Baraati / Wedding Guest',
    'Festive / Chhath & Diwali Puja',
    'Engagement / Sangeet Night',
    'Executive Corporate / Formal Meeting',
    'Party & Evening Reception',
    'Smart Weekend Casual',
  ];

  const stylesList = [
    'Royal Heritage & Indo-Western',
    'Classic Italian 2/3-Piece Sharp',
    'Modi / Nehru Jacket Fusion',
    'Contemporary Minimalist Linen',
    'Traditional Dhoti-Kurta Auspicious',
  ];

  const fabricsList = [
    'Raw Silk & Jacquard Brocade',
    '100% Pure Irish Linen',
    'Egyptian Giza Cotton Micro-Twill',
    'Wrinkle-Resistant Wool Blend',
    'Soft Cotton-Silk Blend',
  ];

  const budgetList = [
    'Under ₹3,000 (Value Picks)',
    '₹3,000 – ₹6,000 (Popular Festive)',
    '₹6,000 – ₹12,000 (Executive & Suites)',
    '₹12,000+ (Imperial Groom Special)',
  ];

  const handleGenerateStyle = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          stylePreference,
          fabric,
          budget,
          heightFit,
          weather: 'Dumka seasonal climate',
        }),
      });

      const data = await res.json();
      if (data.outfit) {
        setOutfitResult(data.outfit);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error('Stylist generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultWhatsApp = () => {
    if (!outfitResult) return;
    const msg = `Hello Basuki Traders Dumka,\nI used your AI Style Advisor and loved this recommendation:\n\n*${outfitResult.outfitTitle}*\n- Garment: ${outfitResult.primaryGarment}\n- Bottom: ${outfitResult.bottomWear}\n- Est. Budget: ${outfitResult.estimatedPriceRange}\n\nCan I visit your Kuldeep Singh Rd store to check fabric swatches and get tailored measurements?`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <section id="stylist" className="py-16 sm:py-20 bg-[#0B0F17] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Powered Personal Menswear Stylist</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            Bespoke Outfit <span className="luxury-gradient-text">Architect</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Get an instant custom-curated ensemble curated by Basuki Traders' master stylists for your upcoming wedding, festival, or corporate occasion in Dumka.
          </p>
        </div>

        {/* Interactive Stylist Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (Inputs) */}
          <div className="lg:col-span-5 bg-[#101726] border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/60 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-cinzel font-bold text-lg text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Your Style Preferences</span>
              </h3>
              <span className="text-[11px] text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/15">
                Live Advisor
              </span>
            </div>

            <form onSubmit={handleGenerateStyle} className="space-y-4 text-xs">
              {/* Occasion */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  1. What is the Occasion?
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                >
                  {occasionsList.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Style Aesthetic */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  2. Style & Silhouette Preference
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                >
                  {stylesList.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Fabric Choice */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  3. Preferred Fabric / Texture
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                >
                  {fabricsList.map((fb) => (
                    <option key={fb} value={fb}>{fb}</option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  4. Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                >
                  {budgetList.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* Fit Profile */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  5. Fit & Body Profile
                </label>
                <input
                  type="text"
                  value={heightFit}
                  onChange={(e) => setHeightFit(e.target.value)}
                  placeholder="e.g. Slim fit, 5'10 height, athletic shoulders"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Styling Ensemble with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Curate My Custom Look</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Curated Look Presentation */}
          <div className="lg:col-span-7">
            {!outfitResult && !loading ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[460px]">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-200">
                  Your Bespoke Recommendation Awaits
                </h3>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                  Select your occasion and fabric preferences on the left, then click <strong>"Curate My Custom Look"</strong> to generate a complete tailored outfit plan ready for Dumka fitting.
                </p>
                <button
                  onClick={() => handleGenerateStyle()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold"
                >
                  Generate Quick Sample Look
                </button>
              </div>
            ) : loading ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[460px] space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin flex items-center justify-center" />
                <h3 className="font-cinzel text-lg font-bold text-slate-200">
                  Consulting Master Tailor Knowledgebase...
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Matching colors, texture pairing, and silhouette geometry for Dumka's climate.
                </p>
              </div>
            ) : outfitResult && (
              <div className="bg-gradient-to-br from-[#101726] to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black space-y-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Result Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      Recommended Ensemble
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-slate-100 mt-1">
                      {outfitResult.outfitTitle}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Est. Range in Store</span>
                    <span className="text-lg font-bold text-amber-300 font-mono">
                      {outfitResult.estimatedPriceRange}
                    </span>
                  </div>
                </div>

                {/* Why It Works Quote */}
                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed italic">
                  "{outfitResult.whyItWorks}"
                </div>

                {/* Garments Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Primary Garment */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <Shirt className="w-4 h-4" />
                      Primary Garment
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {outfitResult.primaryGarment}
                    </p>
                  </div>

                  {/* Bottom Wear */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      Bottom Wear & Pairing
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {outfitResult.bottomWear}
                    </p>
                  </div>

                  {/* Layering piece if any */}
                  {outfitResult.layeringPiece && (
                    <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                        <Crown className="w-4 h-4" />
                        Layering Accent (Jacket / Dupatta / Stole)
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {outfitResult.layeringPiece}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footwear & Accessories */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Footprints className="w-4 h-4 text-amber-400" />
                    Recommended Footwear & Accents:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {outfitResult.footwearAccessories.map((acc, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs border border-slate-700 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Master Tailoring & Fabric Care */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                      <Scissors className="w-3.5 h-3.5 text-amber-400" />
                      Master Tailor Note:
                    </span>
                    <p className="text-slate-300">{outfitResult.tailoringAdvice}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Fabric Longevity:
                    </span>
                    <p className="text-slate-300">{outfitResult.careAndFabricTip}</p>
                  </div>
                </div>

                {/* CTA Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleConsultWhatsApp}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Look to Store via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleGenerateStyle()}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Try Another Variation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
