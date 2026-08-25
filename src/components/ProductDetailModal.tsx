import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Scissors, 
  ShieldCheck, 
  Sparkles, 
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { ProductItem } from '../types';
import { STORE_INFO } from '../data/storeData';
import { formatINR, createWhatsAppLink } from '../utils/storeUtils';
import confetti from 'canvas-confetti';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onOpenBooking: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenBooking,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0] || 'Standard';

  const handleReserveWhatsApp = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });

    const msg = `Hello Basuki Traders Dumka,\nI would like to reserve/try on:\n*${product.title}*\nCategory: ${product.categoryName}\nSize: ${currentSize}\nPrice: ${formatINR(product.price)}\n\nPlease confirm availability for trial at your Kuldeep Singh Rd, Dumka showroom.`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0F1622] border border-amber-500/30 rounded-3xl shadow-2xl shadow-black p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Garment Photo */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[380px] sm:h-[460px] object-cover object-top"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right: Details, Sizing & Actions */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <span>{product.categoryName}</span>
                <span className="text-slate-400">{product.occasion}</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100 leading-snug">
                {product.title}
              </h2>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-2xl font-bold text-amber-300 font-mono">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF In-Store
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Fabric & Texture:</span>
                <span className="text-slate-200 font-medium">{product.fabric}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-0.5">Color Palette:</span>
                <span className="text-slate-200 font-medium">{product.color}</span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-300 block">Garment Highlights:</span>
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200">Select Size for Trial:</span>
                <span className="text-amber-400 font-medium">Available at Dumka Store</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      currentSize === sz
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950 scale-105'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReserveWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Reserve on WhatsApp for Trial</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isWishlisted
                    ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-400' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Store Location assurance footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Kuldeep Singh Rd, Dumka
              </span>
              <a
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Call {STORE_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
