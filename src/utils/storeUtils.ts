export function getLiveStoreStatus(): {
  isOpen: boolean;
  statusText: string;
  subText: string;
  badgeColor: string;
} {
  // Current time in IST (UTC + 5:30)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 3600000 * 5.5);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Open 9:30 AM (570 mins) to 7:30 PM (1170 mins)
  const openTimeMinutes = 9 * 60 + 30; // 570
  const closeTimeMinutes = 19 * 60 + 30; // 1170

  if (currentMinutes >= openTimeMinutes && currentMinutes < closeTimeMinutes) {
    const minsUntilClose = closeTimeMinutes - currentMinutes;
    if (minsUntilClose <= 45) {
      return {
        isOpen: true,
        statusText: 'Open · Closes soon at 7:30 PM',
        subText: 'Confirmed by phone call 9 weeks ago',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    }
    return {
      isOpen: true,
      statusText: 'Open · Closes 7:30 pm',
      subText: 'Confirmed by phone call 9 weeks ago',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Closed · Opens 9:30 am',
      subText: 'Confirmed by phone call 9 weeks ago',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    };
  }
}

export function createWhatsAppLink(message: string, phone: string = '917004540174'): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function getGoogleMapsUrl(address: string = 'BASUKI TRADERS, Kuldeep Singh Rd, Dumka, Jharkhand 814101'): string {
  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

export function getDirectionsUrl(destination: string = 'BASUKI TRADERS, Kuldeep Singh Rd, Dumka, Jharkhand 814101'): string {
  const encoded = encodeURIComponent(destination);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
