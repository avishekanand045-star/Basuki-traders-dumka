import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  MessageSquare, 
  ShoppingBag, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../types';
import { PRODUCTS_CATALOG } from '../data/storeData';
import { formatINR, createWhatsAppLink } from '../utils/storeUtils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS_CATALOG.filter((p) => wishlistIds.includes(p.id));
  const totalPrice = wishlistedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleSendWishlistWhatsApp = () => {
    if (wishlistedProducts.length === 0) return;

    const itemsSummary = wishlistedProducts
      .map((p, i) => `${i + 1}. ${p.title} (${formatINR(p.price)})`)
      .join('\n');

    const msg = `Hello Basuki Traders Dumka,\nI have saved these items in my wishlist on your website:\n\n${itemsSummary}\n\n*Estimated Total:* ${formatINR(totalPrice)}\n\nPlease let me know if these are ready for trial at your Kuldeep Singh Rd, Dumka showroom!`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div 
        onClick={onClose}
        className="absolute inset-0" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F1622] border-l border-amber-500/30 shadow-2xl p-6 flex flex-col justify-between">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h3 className="font-cinzel font-bold text-lg text-slate-100">
                Saved Items ({wishlistedProducts.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm font-cinzel text-slate-300">Your wishlist is empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any outfit or suit to save it for your store visit.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex gap-3 items-center group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 rounded-xl object-cover object-top shrink-0 bg-slate-950"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProduct(item);
                      }}
                      className="font-cinzel font-bold text-xs text-slate-200 truncate hover:text-amber-300 cursor-pointer"
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-amber-400 font-mono font-semibold mt-0.5">
                      {formatINR(item.price)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.fabric.split(' ')[0]} • {item.categoryName}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveWishlist(item.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          {wishlistedProducts.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Estimated:</span>
                <span className="font-bold text-amber-300 font-mono text-base">
                  {formatINR(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleSendWishlistWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send Wishlist to Store via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
