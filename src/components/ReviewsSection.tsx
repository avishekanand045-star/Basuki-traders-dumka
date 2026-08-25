import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  Sparkles, 
  MapPin, 
  Crown,
  Quote,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/storeData';
import { ReviewItem } from '../types';
import confetti from 'canvas-confetti';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form states
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('Dumka');
  const [newPurchasedItem, setNewPurchasedItem] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleHelpful = (id: string) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((prev) => [...prev, id]);
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newName.trim(),
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      relativeTime: 'Just now',
      verified: true,
      location: newLocation.trim() || 'Dumka',
      purchasedItem: newPurchasedItem.trim() || 'Men\'s Clothing',
      comment: newComment.trim(),
      helpfulCount: 1,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setShowReviewModal(false);
    setNewName('');
    setNewPurchasedItem('');
    setNewComment('');

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Customer Testimonials & Ratings</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            5.0 Stars of Uncompromised <span className="luxury-gradient-text">Trust</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified experiences and reviews from gentlemen and wedding families across Dumka and Santhal Pargana.
          </p>
        </div>

        {/* Rating Overview Score Card */}
        <div className="bg-[#101726] border border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl shadow-black/60">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Big 5.0 score */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-slate-800 md:pr-8 space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="font-cinzel font-black text-5xl sm:text-6xl text-amber-400">5.0</span>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-semibold">{reviewsList.length} Verified Reviews</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% of our patrons in Dumka rate Basuki Traders with full 5-star marks for fabric authenticity and fit.
              </p>
            </div>

            {/* Sub category ratings */}
            <div className="md:col-span-5 space-y-3">
              {[
                { label: 'Fabric Authenticity & Quality', score: '5.0', percent: '100%' },
                { label: 'Tailoring Precision & Fitting', score: '5.0', percent: '100%' },
                { label: 'Value for Money / Pricing', score: '5.0', percent: '100%' },
                { label: 'Staff Hospitality & Courtesy', score: '5.0', percent: '100%' },
              ].map((metric, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>{metric.label}</span>
                    <span className="text-amber-400 font-bold">{metric.score} ★</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="md:col-span-3 text-center space-y-3 md:pl-4">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950 transition-all"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Store Review</span>
              </button>
              <p className="text-[11px] text-slate-500">
                Are you a recent customer? Share your experience.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => {
            const hasMarkedHelpful = helpfulIds.includes(review.id);

            return (
              <div
                key={review.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-black/50"
              >
                <div className="space-y-3">
                  {/* Top Bar: Author, Star rating & Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-cinzel font-bold text-sm text-slate-100">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span title="Verified Local Customer">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {review.location || 'Dumka'} • {review.relativeTime}
                      </p>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Purchase item tag */}
                  {review.purchasedItem && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-medium">
                      <span>Purchased: {review.purchasedItem}</span>
                    </div>
                  )}

                  {/* Comment Quote */}
                  <div className="relative pt-1">
                    <Quote className="w-6 h-6 text-slate-700/40 absolute -top-1 -left-1" />
                    <p className="text-xs text-slate-300 leading-relaxed pl-4">
                      {review.comment}
                    </p>
                  </div>
                </div>

                {/* Helpful count row */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-slate-500">Verified Google Experience</span>
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                      hasMarkedHelpful
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div 
          onClick={() => setShowReviewModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0F1622] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-cinzel font-bold text-xl text-slate-100 flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>Write Your Review</span>
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Vikas Anand"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location / Area</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Tin Bazar, Dumka"
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Item Purchased</label>
                  <input
                    type="text"
                    value={newPurchasedItem}
                    onChange={(e) => setNewPurchasedItem(e.target.value)}
                    placeholder="e.g. Groom Sherwani / Linen Shirt"
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1.5 rounded bg-slate-900 hover:bg-slate-800"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Review & Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details about fitting, fabric quality, staff behavior, or wedding shopping experience at Basuki Traders..."
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
