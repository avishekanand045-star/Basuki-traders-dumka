import React, { useState } from 'react';
import { 
  X, 
  Scissors, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Crown,
  MessageSquare
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { createWhatsAppLink } from '../utils/storeUtils';
import confetti from 'canvas-confetti';

interface TailoringAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TailoringAppointmentModal: React.FC<TailoringAppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 1:00 PM');
  const [serviceType, setServiceType] = useState('Wedding Groom Sherwani & Safa Fitting');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    const msg = `Hello Basuki Traders Dumka,\nI would like to book an in-store appointment:\n\n*Name:* ${customerName}\n*Phone:* ${phone}\n*Preferred Date:* ${date || 'Soon'}\n*Time Slot:* ${timeSlot}\n*Service Required:* ${serviceType}\n*Notes:* ${notes || 'None'}\n\nPlease confirm my slot at your Kuldeep Singh Rd store.`;
    
    setTimeout(() => {
      window.open(createWhatsAppLink(msg), '_blank');
    }, 800);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0F1622] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                <Scissors className="w-3.5 h-3.5" />
                <span>Bespoke Fitting & Consultation</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-slate-100">
                Book Tailor Measurement Session
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Reserve 1-on-1 private fitting with our master tailor at Kuldeep Singh Rd, Dumka.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 09876543210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full py-2.5 px-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option>10:00 AM – 12:00 PM</option>
                    <option>12:00 PM – 2:00 PM</option>
                    <option>2:00 PM – 4:30 PM</option>
                    <option>4:30 PM – 7:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Required</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option>Wedding Groom Sherwani & Safa Fitting</option>
                  <option>2/3-Piece Suit & Blazer Custom Tailoring</option>
                  <option>Modi / Nehru Jacket & Kurta Alterations</option>
                  <option>Festive Family Shopping Consultation</option>
                  <option>Fabric Selection & Measurement Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Special Notes / Requests</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Wedding is next month, need urgent trial of ivory sherwanis..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Send to Store on WhatsApp</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-slate-100">
              Appointment Request Ready!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We have prefilled your request to WhatsApp for instant confirmation by our store manager at Kuldeep Singh Rd, Dumka.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
