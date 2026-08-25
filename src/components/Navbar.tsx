import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  Menu, 
  X, 
  Star,
  ShoppingBag,
  Share2
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getLiveStoreStatus } from '../utils/storeUtils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenWishlist,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStatus, setTimeStatus] = useState(getLiveStoreStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Update live status periodically
    const timer = setInterval(() => {
      setTimeStatus(getLiveStoreStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'collections', label: 'Collections & Suits' },
    { id: 'stylist', label: 'AI Style Advisor', isNew: true },
    { id: 'gallery', label: 'Photos' },
    { id: 'reviews', label: 'Reviews (5.0 ★)' },
    { id: 'location', label: 'Directions & Map' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BASUKI TRADERS - Men\'s Clothing Store in Dumka',
          text: 'Check out BASUKI TRADERS for premium men\'s ethnic wear, wedding sherwanis, suits and custom tailoring in Dumka!',
          url: window.location.href,
        });
      } catch {
        // Share was cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Store link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#070A0F] border-b border-amber-900/30 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 (14 Google Reviews)</span>
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              Kuldeep Singh Rd, Dumka, Jharkhand 814101
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${timeStatus.badgeColor}`}>
              <Clock className="w-3 h-3" />
              {timeStatus.statusText}
            </span>
            <button
              onClick={handleShare}
              className="text-slate-400 hover:text-amber-400 transition-colors p-1 flex items-center gap-1"
              title="Share store profile"
            >
              <Share2 className="w-3 h-3" />
              <span className="hidden md:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#0B0F17]/95 backdrop-blur-md border-amber-900/30 shadow-xl shadow-black/50 py-2.5' 
          : 'bg-[#0B0F17] border-slate-800/80 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Details */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F17] rounded-[7px] flex items-center justify-center">
                <span className="font-cinzel text-amber-400 font-bold text-xl tracking-tighter">BT</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel font-bold text-lg sm:text-xl tracking-wider text-slate-100 group-hover:text-amber-300 transition-colors">
                  BASUKI TRADERS
                </h1>
              </div>
              <p className="text-[11px] text-amber-500/90 font-medium tracking-wide uppercase">
                Men's Clothing & Bespoke Fashion • Dumka
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'text-amber-300 bg-amber-500/10' 
                    : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
                {item.isNew && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold uppercase bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-full">
                    AI
                  </span>
                )}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-600/30 rounded-lg hover:bg-amber-900/40 hover:border-amber-500 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_INFO.phone}</span>
            </a>

            {/* WhatsApp Fast CTA */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent('Hello Basuki Traders, I would like to inquire about men\'s clothing collections & store visit.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-lg shadow-sm shadow-emerald-950 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">WhatsApp</span>
              <span className="md:hidden">Chat</span>
            </a>

            {/* Book Fitting Appointment */}
            <button
              onClick={onOpenBooking}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-950 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Fitting</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-5 border-t border-slate-800 bg-[#0B0F17] animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                    activeTab === item.id
                      ? 'bg-amber-500/15 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-500 text-slate-950 rounded-full">
                      AI Stylist
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 text-amber-300 text-sm font-medium border border-amber-900/40"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Store ({STORE_INFO.phone})</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Tailor Fitting / Store Visit</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
