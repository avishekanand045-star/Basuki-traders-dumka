import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Eye, 
  Sparkles,
  Crown
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/storeData';
import { GalleryPhoto } from '../types';
import { createWhatsAppLink } from '../utils/storeUtils';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ethnic' | 'suits' | 'casual' | 'tailoring' | 'store'>('all');

  const filteredPhotos = activeFilter === 'all' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter((p) => p.category === activeFilter);

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#0F1622] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Showroom Visual Showcase</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100">
              Photos & Store <span className="luxury-gradient-text">Ambiance</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Take a visual tour through our Kuldeep Singh Rd showroom in Dumka, exploring groom collections, fabrics, and tailoring craft.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'ethnic', label: 'Wedding & Ethnic' },
              { id: 'suits', label: 'Suits & Blazers' },
              { id: 'casual', label: 'Shirts & Fabrics' },
              { id: 'tailoring', label: 'Tailoring Studio' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo)}
              className="relative group aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption details at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <h3 className="font-cinzel font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-400 z-10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-400 z-10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Photo */}
            <div className="h-[450px] sm:h-[550px] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Footer description & Action */}
            <div className="p-5 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div>
                <h4 className="font-cinzel font-bold text-base text-slate-100">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPhoto.caption}
                </p>
              </div>

              <a
                href={createWhatsAppLink(`Hello Basuki Traders, I saw this photo (${selectedPhoto.title}) in your showroom gallery. Is this collection currently in stock at your Dumka store?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
