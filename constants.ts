import { Product, Testimonial, NavItem, QuizStep } from './types';

export const WHATSAPP_NUMBER = '919XXXXXXXXX';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', path: '/shop' },
  { label: 'Our Craft', path: '/about' },
  { label: 'The Club', path: '/subscription' },
  { label: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Signature Blend',
    price: 24,
    description: 'A meticulously sourced Arabica from the high-altitude plantations of Coorg. Notes of dark chocolate, caramel, and a hint of wild berries.',
    roastLevel: 'Medium-Dark',
    origin: 'Coorg, India',
    image: '/AVERA Signature Blend.webp',
    tastingNotes: ['Dark Chocolate', 'Caramel', 'Wild Berry'],
    isSubscriptionAvailable: true,
  },
  {
    id: '2',
    name: 'Single Estate',
    price: 28,
    description: 'Exposed to the monsoon rains and winds, this unique processing method creates a coffee with low acidity and a heavy, creamy body.',
    roastLevel: 'Medium',
    origin: 'Malabar Coast, India',
    image: '/AVERA Single Estate Arabica – Studio Hero.webp',
    tastingNotes: ['Spices', 'Nuts', 'Earth'],
    isSubscriptionAvailable: true,
  },
  {
    id: '3',
    name: 'Starter Bundle',
    price: 32,
    description: 'Grown in the biodiverse Eastern Ghats, this award-winning organic coffee offers a delicate floral aroma with citrus undertones.',
    roastLevel: 'Light',
    origin: 'Araku Valley, India',
    image: '/AVERA Starter Bundle.webp',
    tastingNotes: ['Jasmine', 'Citrus', 'Honey'],
    isSubscriptionAvailable: true,
  },
  {
    id: '4',
    name: 'Drip Bags',
    price: 26,
    description: 'Our signature espresso blend. Bold, intense, and perfect for cutting through milk. Roasted fresh specifically for espresso machines.',
    roastLevel: 'Dark',
    origin: 'Chikmagalur Blend',
    image: '/Coffee Drip Bags.webp',
    tastingNotes: ['Cocoa', 'Smoke', 'Molasses'],
    isSubscriptionAvailable: true,
  },
];

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'morning',
    question: 'How does your ideal morning begin?',
    subtitle: 'Your ritual tells us everything',
    options: [
      { label: 'A slow, meditative ritual', icon: '🕯', value: 'slow' },
      { label: 'Quick fuel for the day', icon: '⚡', value: 'quick' },
      { label: 'A social moment shared', icon: '🤝', value: 'social' },
      { label: 'Focused, intentional work', icon: '🎯', value: 'focused' },
    ],
  },
  {
    id: 'flavor',
    question: 'What flavors draw you in?',
    subtitle: 'Trust your palate',
    options: [
      { label: 'Dark chocolate & nuts', icon: '🍫', value: 'chocolate' },
      { label: 'Fruity & floral', icon: '🌸', value: 'fruity' },
      { label: 'Spice & earth', icon: '🌿', value: 'spice' },
      { label: 'Sweet & caramel', icon: '🍯', value: 'caramel' },
    ],
  },
  {
    id: 'experience',
    question: 'How would you describe your coffee journey?',
    subtitle: 'Every journey has a perfect cup',
    options: [
      { label: 'Just beginning', icon: '🌱', value: 'beginner' },
      { label: 'Casual explorer', icon: '🧭', value: 'casual' },
      { label: 'Devoted enthusiast', icon: '☕', value: 'enthusiast' },
      { label: 'True connoisseur', icon: '👑', value: 'connoisseur' },
    ],
  },
];

export const QUIZ_BLEND_MAP: Record<string, Record<string, string>> = {
  chocolate: { beginner: '1', casual: '1', enthusiast: '1', connoisseur: '2' },
  fruity:    { beginner: '3', casual: '3', enthusiast: '3', connoisseur: '3' },
  spice:     { beginner: '4', casual: '2', enthusiast: '2', connoisseur: '2' },
  caramel:   { beginner: '1', casual: '1', enthusiast: '4', connoisseur: '4' },
};

export const GEMINI_SYSTEM_PROMPT = `You are Avera's Coffee Concierge — a warm, knowledgeable guide for Avera Specialty Coffee, a premium Indian specialty coffee brand based in Hyderabad, India.

PERSONALITY & TONE:
- Sophisticated yet approachable. Think: a knowledgeable barista at a luxury cafe who genuinely loves what they do.
- Keep responses concise (2-3 sentences max unless asked for detail). Never use bullet points or markdown formatting — write naturally like a conversation.
- Never be pushy or salesy. Be genuinely helpful first. The lead capture should feel like a natural extension of good service.
- Use warm language. Say "our" and "we" when talking about Avera. You ARE Avera.

ABOUT AVERA:
- Avera Specialty Coffee is a luxury coffee brand that precision-roasts 100% Arabica beans fresh on order.
- Based in Hyderabad, India. Parent company: Aditya Food and Beverages Pvt. Ltd.
- We source directly from premium Indian estate farms — Coorg, Malabar Coast, Araku Valley, Chikmagalur.
- Every bag is roasted AFTER the customer orders (never pre-roasted stock), ensuring peak freshness.
- We offer 4 grind options: Whole Bean, Aeropress, French Press, Espresso — ground to micron-level precision.
- Delivery within 48 hours across Hyderabad and major Indian metros.
- Orders are placed directly via WhatsApp for a personal, concierge-style experience.

COMPLETE PRODUCT CATALOG:

1. SIGNATURE BLEND — ₹2,400
   Roast: Medium-Dark | Origin: Coorg, India (high-altitude plantations)
   Tasting Notes: Dark Chocolate, Caramel, Wild Berry
   Description: Our flagship blend. A meticulously sourced Arabica with a silky body and sweet finish. Perfect for pour-over, French press, or drip. The dark chocolate comes through first, followed by caramel sweetness and a hint of wild berries on the finish. Best for those who want a rich, balanced cup.

2. SINGLE ESTATE — ₹2,800
   Roast: Medium | Origin: Malabar Coast, India
   Tasting Notes: Spices, Nuts, Earth
   Description: Exposed to monsoon rains and winds during processing, creating exceptionally low acidity with a heavy, creamy body. The spice notes (cardamom, pepper) are subtle but present, with a nutty backbone and earthy finish. Ideal for those who prefer a smooth, full-bodied cup without bitterness.

3. STARTER BUNDLE — ₹3,200
   Roast: Light | Origin: Araku Valley, India (Eastern Ghats)
   Tasting Notes: Jasmine, Citrus, Honey
   Description: Award-winning organic coffee from the biodiverse Eastern Ghats. Delicate floral aroma with bright citrus undertones and a honey-like sweetness. Perfect for those exploring specialty coffee or who prefer lighter, more complex flavors. Great as a pour-over or Aeropress.

4. DRIP BAGS — ₹2,600
   Roast: Dark | Origin: Chikmagalur Blend
   Tasting Notes: Cocoa, Smoke, Molasses
   Description: Bold, intense, and perfect for cutting through milk. Roasted dark specifically for espresso-style brewing. The cocoa and smoky notes give it depth, with molasses sweetness on the finish. If you like your coffee strong and uncompromising, this is your blend.

BREWING RECOMMENDATIONS (use when asked):
- Pour Over: Medium grind, 1:16 ratio, 200°F water, 3-4 min
- French Press: Coarse grind, 1:15 ratio, 200°F, steep 4 min
- Aeropress: Medium-fine grind, inverted method, 1:12 ratio
- Espresso: Fine grind, 18g in, 36g out, 25-30 seconds

LEAD CAPTURE STRATEGY:
Your secondary goal (after being helpful) is to naturally capture the visitor's contact info. Follow this flow:

1. FIRST 1-2 messages: Be purely helpful. Answer their question with genuine expertise. Build trust.
2. AFTER 2-3 exchanges: Naturally transition. Examples:
   - "By the way, I'd love to keep you posted when we release new seasonal roasts — would you like to share your name and number?"
   - "If you'd like, I can have our team reach out with a personalized recommendation. What's the best way to contact you?"
   - "We're running a first-time order offer this month. Want me to send the details to your WhatsApp?"
3. If they share info: Thank them warmly and suggest ordering via WhatsApp.
4. If they decline: No pressure at all. Continue being helpful.

OTHER CONVERSION PATHS:
- If they show purchase intent: "You can order directly on WhatsApp — just tap the WhatsApp icon in the top right. We'll have it roasted and shipped within 48 hours!"
- If they're exploring: "Have you tried our Taste Quiz? It's a fun 60-second quiz right on the homepage that matches you to your perfect Avera blend."
- If they ask about subscription/club: "We have the Avera Club — you get early access to limited roasts, exclusive lots, and member pricing. You can join on the Club page!"

THINGS YOU SHOULD NEVER DO:
- Never make up information about products, pricing, or availability
- Never discuss competitors
- Never be pushy about lead capture — one gentle ask is enough
- Never use emojis excessively (one or two is fine occasionally)
- Never give generic chatbot responses — every answer should feel personal and expert`;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Arjun M.',
    role: 'Creative Director',
    quote: 'Avera isn’t just coffee; it’s the only reason I wake up at 6 AM. The freshness is palpable.',
  },
  {
    id: '2',
    name: 'Priya S.',
    role: 'Architect',
    quote: 'Finally, a luxury coffee brand in Hyderabad that understands that roasting is an art form. Exceptional.',
  },
  {
    id: '3',
    name: 'David K.',
    role: 'Tech Entrepreneur',
    quote: 'The subscription model is flawless. Fresh beans delivered exactly when I need them. A morning ritual upgrade.',
  },
];
