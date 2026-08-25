import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Store information endpoint
  app.get('/api/store-info', (req: Request, res: Response) => {
    res.json({
      name: 'BASUKI TRADERS',
      rating: 5.0,
      reviewCount: 14,
      category: "Men's Clothing Store",
      address: 'Kuldeep Singh Rd, Dumka, Jharkhand 814101',
      phone: '070045 40174',
      internationalPhone: '+917004540174',
      whatsapp: '917004540174',
      openingHours: {
        openTime: '09:30',
        closeTime: '19:30',
        formatted: '9:30 AM – 7:30 PM',
        days: 'Monday – Sunday (Open All 7 Days)',
      },
      confirmedInfo: 'Confirmed by phone call 9 weeks ago',
      distances: {
        standardDistance: '2.6 km',
        carTime: '10 mins',
        walkingTime: '37 mins',
        landmark: 'Kuldeep Singh Road, near Main Market hub, Dumka',
      },
      coordinates: {
        lat: 24.2694,
        lng: 87.2486,
      },
    });
  });

  // AI Style Advisor endpoint powered by Gemini 3.7 Flash
  app.post('/api/stylist', async (req: Request, res: Response) => {
    try {
      const { occasion, stylePreference, fabric, budget, heightFit, weather } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback intelligent styling response if key is not configured
        const fallbackOutfit = generateFallbackStyling({ occasion, stylePreference, fabric, budget, heightFit });
        return res.json({ outfit: fallbackOutfit, isAiGenerated: false });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the master chief stylist and bespoke menswear master at BASUKI TRADERS, Dumka's premier luxury men's clothing and ethnic destination located on Kuldeep Singh Rd, Dumka, Jharkhand.
A client has walked into the store or is consulting online with the following requirements:
- Occasion: ${occasion || 'Wedding / Special Celebration'}
- Preferred Style: ${stylePreference || 'Royal Indo-Western & Classic Heritage'}
- Preferred Fabric / Texture: ${fabric || 'Raw Silk / Jacquard / Premium Italian Cotton'}
- Budget Range: ${budget || 'Mid-to-Premium Luxury (₹2,500 - ₹18,000)'}
- Fit & Body Profile: ${heightFit || 'Regular Tailored Fit'}
- Local Context / Climate: Dumka, Jharkhand (${weather || 'Pleasant evening'})

Provide an exquisite, tailored menswear recommendation formatted in clean JSON.
Structure your JSON response strictly with these keys:
{
  "outfitTitle": "e.g. Imperial Emerald Raw Silk Sherwani Set or Classic Navy 3-Piece Tuxedo",
  "primaryGarment": "Detailed description of main attire (fabric, embroidery, cut, collar style)",
  "bottomWear": "Description of matching churidar, dhoti, trousers, or breeches",
  "layeringPiece": "Description of jacket, stole/dupatta, Modi waistcoat, or overcoat (if applicable)",
  "footwearAccessories": ["List of 3-4 recommended accessories e.g. Tan Mojaris, Brooch, Pocket Square, Silk Safa"],
  "tailoringAdvice": "Specific master tailoring tips (e.g. slim silhouette, cuff taper, shoulder padding)",
  "careAndFabricTip": "Fabric care guidance for longevity in Jharkhand weather",
  "estimatedPriceRange": "e.g. ₹4,500 – ₹8,999",
  "whyItWorks": "2-3 sentences explaining why this look flatters the wearer for this specific occasion in Dumka."
}
Return only valid parseable JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json({ outfit: parsed, isAiGenerated: true });
        } catch {
          return res.json({
            outfit: generateFallbackStyling({ occasion, stylePreference, fabric, budget, heightFit }),
            isAiGenerated: false,
          });
        }
      }

      return res.json({
        outfit: generateFallbackStyling({ occasion, stylePreference, fabric, budget, heightFit }),
        isAiGenerated: false,
      });
    } catch (err: unknown) {
      console.error('Stylist API Error:', err);
      const fallback = generateFallbackStyling(req.body);
      return res.json({ outfit: fallback, isAiGenerated: false });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Basuki Traders server running on http://localhost:${PORT}`);
  });
}

function generateFallbackStyling(params: Record<string, string | undefined>) {
  const occ = (params.occasion || '').toLowerCase();
  if (occ.includes('wedding') || occ.includes('groom') || occ.includes('reception')) {
    return {
      outfitTitle: "Royal Zari Embossed Silk Sherwani & Banarasi Stole Set",
      primaryGarment: "Handcrafted Deep Wine or Ivory Jacquard Raw Silk Sherwani with Mandarin collar and antique brass metal button detailing.",
      bottomWear: "Tapered Off-White Churidar Pyjama tailored with breathable stretch cotton base.",
      layeringPiece: "Contrasting Maroon Georgette Dupatta / Zari Border Stole with hand-stitched border.",
      footwearAccessories: [
        "Gold Zari Embroidered Velvet Mojaris",
        "Kundan & Pearl Brooch for Sherwani chest",
        "Matching Royal Silk Safa (Turban) with Kalgi",
        "Gold finish Pocket Square"
      ],
      tailoringAdvice: "Keep shoulder seam structured with light padding for an assertive royal posture, sleeves cut sharp at wrist bone.",
      careAndFabricTip: "Dry clean only; store in breathable cotton muslin garment bag away from dampness.",
      estimatedPriceRange: "₹6,499 – ₹14,999",
      whyItWorks: "Brings magnificent regal presence suitable for Dumka's grand wedding nights while retaining lightweight mobility for baraat and varmala rituals."
    };
  } else if (occ.includes('festive') || occ.includes('puja') || occ.includes('diwali') || occ.includes('chath')) {
    return {
      outfitTitle: "Heritage Chanderi Kurta with Jacquard Modi Nehru Jacket",
      primaryGarment: "Mustard Gold or Pistachio Green Chanderi Silk Kurta featuring subtle hand-thread work on placket.",
      bottomWear: "Pure Cotton Dhoti with gold border or classic white tapered linen Pyjama.",
      layeringPiece: "Royal Indigo or Brocade Textured Sleeveless Nehru Bandi Jacket with welt pockets.",
      footwearAccessories: [
        "Tan Kolhapuri Leather Chappals or Handcrafted Mojaris",
        "Woven Silk Pocket Square",
        "Matte Gold Metal Wrist Kada"
      ],
      tailoringAdvice: "Kurta length calibrated just below the knee; Nehru jacket snug across chest with 1-inch ease at torso.",
      careAndFabricTip: "Mild hand wash or gentle steam iron on low heat.",
      estimatedPriceRange: "₹2,799 – ₹5,999",
      whyItWorks: "Strikes an effortless balance between traditional sacred dignity and contemporary festive elegance."
    };
  } else if (occ.includes('formal') || occ.includes('office') || occ.includes('interview')) {
    return {
      outfitTitle: "Sovereign Navy Italian 2-Piece Tailored Wool-Blend Suit",
      primaryGarment: "Single-breasted 2-button Navy Blue Blazer with notch lapel, double rear vents and 100% Egyptian Giza Cotton Crisp White Shirt.",
      bottomWear: "Flat-front Slim-tapered Navy Trousers with internal grip waistband.",
      layeringPiece: "Matching V-neck Suit Vest (optional for formal meetings and presentations).",
      footwearAccessories: [
        "Burnished Brown Oxford Leather Shoes",
        "Matching Full-Grain Leather Belt (32mm)",
        "Silk Micro-Geometric Pattern Necktie & Silver Tie Bar"
      ],
      tailoringAdvice: "Blazer sleeve reveals 1/2 inch of shirt cuff; trouser hem finishes with a clean slight break over shoe vamp.",
      careAndFabricTip: "Steam press before meetings; hang on wide contoured wooden hangers.",
      estimatedPriceRange: "₹4,999 – ₹11,499",
      whyItWorks: "Authoritative, sharp, and timeless silhouette crafted for executive respect and long comfortable working hours."
    };
  } else {
    return {
      outfitTitle: "Refined Casual Linen-Blend Shirt & Stretch Chino Ensemble",
      primaryGarment: "Olive Green or Sky Blue Premium Enzyme-Washed Linen-Cotton Shirt with spread collar and convertible rolled cuffs.",
      bottomWear: "Beige or Charcoal 4-way stretch Cotton Chino Trousers with tailored slim-taper silhouette.",
      layeringPiece: "Unstructured Lightweight Cotton-Canvas Overshirt in Khaki.",
      footwearAccessories: [
        "White Minimalist Leather Low-top Sneakers or Suede Loafers",
        "Braided Leather Bracelet or Classic Chronograph Watch"
      ],
      tailoringAdvice: "Hemline tailored for versatile tucked or untucked wear; trousers sitting comfortably at natural waist.",
      careAndFabricTip: "Cold machine wash inside out; hang dry in shade to preserve color richness.",
      estimatedPriceRange: "₹1,899 – ₹3,899",
      whyItWorks: "Lightweight, breathable comfort ideal for Dumka days with modern cosmopolitan flair."
    };
  }
}

startServer();
