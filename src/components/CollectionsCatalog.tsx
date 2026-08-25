import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  Eye, 
  Check, 
  ShoppingBag,
  SlidersHorizontal,
  Crown
} from 'lucide-react';
import { ProductItem, ProductCategory } from '../types';
import { PRODUCTS_CATALOG } from '../data/storeData';
import { formatINR, createWhatsAppLink } from '../utils/storeUtils';

interface CollectionsCatalogProps {
  onSelectProduct: (product: ProductItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CollectionsCatalog: React.FC<CollectionsCatalogProps> = ({
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'wedding_ethnic', label: 'Wedding & Ethnic Wear' },
    { id: 'formal_suits', label: 'Suits & Blazers' },
    { id: 'shirts_trousers', label: 'Shirts & Trousers' },
    { id: 'casual_denims', label: 'Casuals & Denims' },
    { id: 'accessories', label: 'Safas & Accessories' },
  ];

  const occasions = [
    { id: 'all', label: 'All Occasions' },
    { id: 'wedding', label: 'Wedding / Groom' },
    { id: 'festive', label: 'Festive / Puja' },
    { id: 'formal', label: 'Corporate / Formal' },
    { id: 'casual', label: 'Smart Casual' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesFabric = item.fabric.toLowerCase().includes(q);
        const matchesOccasion = item.occasion.toLowerCase().includes(q);
        const matchesCat = item.categoryName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesFabric && !matchesOccasion && !matchesCat) {
          return false;
        }
      }
      // Occasion filter
      if (selectedOccasion !== 'all') {
        const occ = item.occasion.toLowerCase();
        if (selectedOccasion === 'wedding' && !occ.includes('wedding') && !occ.includes('groom') && !occ.includes('reception')) {
          return false;
        }
        if (selectedOccasion === 'festive' && !occ.includes('festiv') && !occ.includes('puja') && !occ.includes('haldi') && !occ.includes('sangeet')) {
          return false;
        }
        if (selectedOccasion === 'formal' && !occ.includes('formal') && !occ.includes('corporate') && !occ.includes('workwear')) {
          return false;
        }
        if (selectedOccasion === 'casual' && !occ.includes('casual') && !occ.includes('travel') && !occ.includes('weekend')) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default featured
    });
  }, [activeCategory, searchQuery, selectedOccasion, sortBy]);

  return (
    <section id="collections" className="py-16 sm:py-20 bg-[#0F1622] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>Curated Showroom Catalog</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
              Men's Wardrobe <span className="luxury-gradient-text">Collections</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Explore in-store apparel available for trial, fitting, and bespoke alterations at Kuldeep Singh Rd, Dumka.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sherwani, suit, linen..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Filters */}
        <div className="space-y-4 mb-8">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-slate-100 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub Filters: Occasion & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                Occasion:
              </span>
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedOccasion === occ.id
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured / Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="font-cinzel text-lg font-bold text-slate-300">No matching items found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedOccasion('all');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const discountPercent = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const whatsappInquiryText = `Hello Basuki Traders Dumka, I am interested in "${product.title}" (${formatINR(product.price)}). Is this available for trial/fitting at your Kuldeep Singh Rd store?`;

              return (
                <div
                  key={product.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        isWishlisted
                          ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-950'
                          : 'bg-black/40 text-slate-300 hover:text-rose-400 hover:bg-black/60'
                      }`}
                      title={isWishlisted ? 'Remove from Saved' : 'Save to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Overlay Button */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-amber-500/30"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View & Details</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium mb-1">
                        <span>{product.categoryName}</span>
                        <span className="text-slate-400">{product.fabric.split(' ')[0]}</span>
                      </div>

                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-cinzel font-bold text-sm text-slate-100 line-clamp-2 hover:text-amber-300 cursor-pointer transition-colors"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                        {product.fabric}
                      </p>
                    </div>

                    {/* Sizes Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                      <span className="text-[10px] text-slate-500 mr-0.5">Sizes:</span>
                      {product.sizes.slice(0, 4).map((sz, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700"
                        >
                          {sz}
                        </span>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-[10px] text-slate-500">+{product.sizes.length - 4}</span>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-amber-300 font-mono">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-500 line-through font-mono">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {discountPercent > 0 && (
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            Save {discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* WhatsApp Inquiry Button */}
                      <a
                        href={createWhatsAppLink(whatsappInquiryText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/60 hover:border-emerald-500 transition-all flex items-center gap-1 text-xs font-semibold"
                        title="Inquire Availability on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span className="hidden sm:inline">Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
