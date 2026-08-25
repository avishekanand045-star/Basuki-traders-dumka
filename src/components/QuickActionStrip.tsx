import React, { useState } from 'react';
import { 
  Phone, 
  Navigation, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Car, 
  Footprints,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { getLiveStoreStatus, getDirectionsUrl, createWhatsAppLink } from '../utils/storeUtils';
import confetti from 'canvas-confetti';

interface QuickActionStripProps {
  onOpenBooking: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const QuickActionStrip: React.FC<QuickActionStripProps> = ({
  onOpenBooking,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const timeStatus = getLiveStoreStatus();

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BASUKI TRADERS - Men\'s Clothing Store, Dumka',
          text: 'Visit BASUKI TRADERS on Kuldeep Singh Rd, Dumka for exclusive sherwanis, suits, kurtas & fine tailoring! 5.0 Star Rated (070045 40174)',
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Basuki Traders website link copied to clipboard!');
    }
  };

  const handleBookmarkClick = () => {
    onToggleBookmark();
    if (!isBookmarked) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
      {/* Primary Action Card */}
      <div className="bg-[#101726]/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
        {/* Verification status & timing header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live Timing Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${timeStatus.badgeColor}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{timeStatus.statusText}</span>
            </div>

            {/* Confirmed phone call badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_INFO.confirmedInfo}</span>
            </div>
          </div>

          {/* Quick Distance Pill */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{STORE_INFO.distances.standardDistance}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_INFO.distances.carTime}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5 text-slate-400" />
              <span>{STORE_INFO.distances.walkingTime}</span>
            </span>
          </div>
        </div>

        {/* 5 Core Action Buttons directly from user spec: Call, Directions, WhatsApp, Share, Save */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-4">
          {/* 1. CALL */}
          <div className="relative group">
            <a
              id="action-call-btn"
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="w-full flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/80 hover:bg-amber-950/40 border border-slate-700/80 hover:border-amber-500/60 text-slate-100 transition-all hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 mb-1.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Call Store</span>
              <span className="text-[11px] text-amber-400/90 font-mono mt-0.5">{STORE_INFO.phone}</span>
            </a>
            <button
              onClick={handleCopyPhone}
              title="Copy Phone Number"
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-amber-300 rounded bg-slate-900/60 hover:bg-slate-900"
            >
              {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* 2. DIRECTIONS */}
          <a
            id="action-directions-btn"
            href={getDirectionsUrl(STORE_INFO.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/80 hover:bg-blue-950/40 border border-slate-700/80 hover:border-blue-500/60 text-slate-100 transition-all hover:scale-[1.02] group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 mb-1.5 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Directions</span>
            <span className="text-[11px] text-blue-300/90 font-medium mt-0.5">
              {STORE_INFO.distances.standardDistance} • {STORE_INFO.distances.carTime}
            </span>
          </a>

          {/* 3. WHATSAPP */}
          <a
            id="action-whatsapp-btn"
            href={createWhatsAppLink("Hello Basuki Traders Dumka, I am browsing your website and would like to inquire about men's wear collections, prices, and sizes.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-700/50 hover:border-emerald-500 text-slate-100 transition-all hover:scale-[1.02] group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">WhatsApp</span>
            <span className="text-[11px] text-emerald-400/80 font-medium mt-0.5">Instant Reply</span>
          </a>

          {/* 4. SHARE */}
          <button
            id="action-share-btn"
            onClick={handleShare}
            className="w-full flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/80 hover:bg-purple-950/40 border border-slate-700/80 hover:border-purple-500/60 text-slate-100 transition-all hover:scale-[1.02] group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-400 mb-1.5 group-hover:bg-purple-500 group-hover:text-slate-950 transition-colors">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Share Store</span>
            <span className="text-[11px] text-purple-300/80 font-medium mt-0.5">Invite Family</span>
          </button>

          {/* 5. SAVE / BOOKMARK */}
          <button
            id="action-save-btn"
            onClick={handleBookmarkClick}
            className={`w-full col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all hover:scale-[1.02] group ${
              isBookmarked 
                ? 'bg-amber-950/50 border-amber-500 text-amber-300' 
                : 'bg-slate-800/80 hover:bg-amber-950/40 border-slate-700/80 hover:border-amber-500/60 text-slate-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
              isBookmarked ? 'bg-amber-500 text-slate-950' : 'bg-amber-500/15 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950'
            }`}>
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              {isBookmarked ? 'Saved to List' : 'Save Store'}
            </span>
            <span className="text-[11px] text-amber-400/80 font-medium mt-0.5">
              {isBookmarked ? 'Bookmarked' : 'Favorite'}
            </span>
          </button>
        </div>

        {/* Address & Quick Copy Row */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">{STORE_INFO.address}</span>
            <button
              onClick={handleCopyAddress}
              className="ml-1 text-slate-400 hover:text-amber-400 underline underline-offset-2 flex items-center gap-1"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Book In-Store Tailor Consultation</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
