/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickActionStrip } from './components/QuickActionStrip';
import { OverviewSection } from './components/OverviewSection';
import { CollectionsCatalog } from './components/CollectionsCatalog';
import { AiStylistAdvisor } from './components/AiStylistAdvisor';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationDirections } from './components/LocationDirections';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TailoringAppointmentModal } from './components/TailoringAppointmentModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { ProductItem } from './types';
import { STORE_INFO } from './data/storeData';
import { getDirectionsUrl, createWhatsAppLink } from './utils/storeUtils';
import { Phone, Navigation, MessageSquare, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Local storage for wishlist IDs
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('basuki_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  // Local storage for bookmarked store status
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('basuki_bookmarked');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('basuki_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('basuki_bookmarked', String(isBookmarked));
    } catch (e) {
      console.error(e);
    }
  }, [isBookmarked]);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreCollections={() => scrollToSection('collections')}
          onOpenStylist={() => scrollToSection('stylist')}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 2. Quick Action Strip (Call, Directions, WhatsApp, Share, Save) */}
        <QuickActionStrip
          onOpenBooking={() => setIsBookingOpen(true)}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* 3. Overview & About Section */}
        <OverviewSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onExploreCollections={() => scrollToSection('collections')}
        />

        {/* 4. Curated Collections Catalog */}
        <CollectionsCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 5. AI Style Advisor (Powered by Gemini) */}
        <AiStylistAdvisor />

        {/* 6. Photos Gallery Showcase */}
        <GallerySection />

        {/* 7. 5.0 Star Customer Reviews */}
        <ReviewsSection />

        {/* 8. Location & Directions Guide */}
        <LocationDirections />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Floating Mobile Bottom Action Dock */}
      <div className="fixed bottom-3 left-3 right-3 sm:hidden z-40 bg-[#0B0F17]/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-2 shadow-2xl shadow-black flex items-center justify-around">
        <a
          href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-amber-400 hover:text-amber-300"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">Call</span>
        </a>

        <a
          href={getDirectionsUrl(STORE_INFO.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-blue-400 hover:text-blue-300"
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">Maps</span>
        </a>

        <a
          href={createWhatsAppLink("Hello Basuki Traders Dumka, I am viewing your website and would like to inquire about men's wear.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-emerald-400 hover:text-emerald-300"
        >
          <MessageSquare className="w-4 h-4 fill-current mb-0.5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-amber-300 hover:text-amber-200"
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">Book Fit</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 text-rose-400 hover:text-rose-300"
        >
          <Heart className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">Saved</span>
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Modals & Slide-overs */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenBooking={() => {
            setSelectedProduct(null);
            setIsBookingOpen(true);
          }}
        />
      )}

      <TailoringAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />
    </div>
  );
}
