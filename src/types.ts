export interface StoreInfo {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  category: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  openingHours: {
    openTime: string; // e.g. "09:30"
    closeTime: string; // e.g. "19:30"
    formatted: string; // "9:30 AM – 7:30 PM"
    days: string;
  };
  confirmedInfo: string;
  distances: {
    standardDistance: string;
    carTime: string;
    walkingTime: string;
    landmark: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type ProductCategory = 
  | 'all'
  | 'wedding_ethnic'
  | 'formal_suits'
  | 'shirts_trousers'
  | 'casual_denims'
  | 'accessories';

export interface ProductItem {
  id: string;
  title: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  color: string;
  occasion: string;
  image: string;
  description: string;
  features: string[];
  sizes: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  tag?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  relativeTime: string;
  verified: boolean;
  comment: string;
  purchasedItem?: string;
  location?: string;
  helpfulCount: number;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'store' | 'ethnic' | 'suits' | 'casual' | 'tailoring';
  url: string;
  caption: string;
}

export interface StylistOutfit {
  outfitTitle: string;
  primaryGarment: string;
  bottomWear: string;
  layeringPiece?: string;
  footwearAccessories: string[];
  tailoringAdvice: string;
  careAndFabricTip: string;
  estimatedPriceRange: string;
  whyItWorks: string;
}

export interface BookingRequest {
  customerName: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: 'wedding_groom' | 'custom_tailoring' | 'suit_fitting' | 'festive_shopping' | 'general_visit';
  notes?: string;
}
