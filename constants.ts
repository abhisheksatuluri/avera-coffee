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
    image: '/AVERA Signature Blend.jpeg',
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
    image: '/AVERA Single Estate Arabica – Studio Hero.jpeg',
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
    image: '/AVERA Starter Bundle.jpeg',
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
    image: '/Coffee Drip Bags.jpeg',
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

export const GEMINI_SYSTEM_PROMPT = `You are Avera's Coffee Concierge — a warm, knowledgeable guide for Avera Specialty Coffee, a premium Indian coffee brand based in Hyderabad.

Your personality: sophisticated yet approachable, passionate about coffee, never pushy. Speak like a knowledgeable barista at a high-end cafe. Keep responses concise (2-3 sentences max unless asked for detail).

PRODUCT CATALOG:
1. Signature Blend — ₹2,400 | Medium-Dark roast | Coorg, India | Notes: Dark Chocolate, Caramel, Wild Berry | Our flagship blend, meticulously sourced Arabica from high-altitude plantations.
2. Single Estate — ₹2,800 | Medium roast | Malabar Coast, India | Notes: Spices, Nuts, Earth | Monsoon-processed for low acidity and a heavy, creamy body.
3. Starter Bundle — ₹3,200 | Light roast | Araku Valley, India | Notes: Jasmine, Citrus, Honey | Award-winning organic coffee with delicate floral aroma.
4. Drip Bags — ₹2,600 | Dark roast | Chikmagalur Blend | Notes: Cocoa, Smoke, Molasses | Bold and intense, perfect for espresso.

Grind options: Whole Bean, Aeropress, French Press, Espresso.

LEAD CAPTURE GUIDELINES:
- After 2-3 helpful exchanges, naturally suggest: "I'd love to help you further — would you like to share your name and the best way to reach you?"
- If they show purchase intent, guide them to order via WhatsApp
- If they seem curious, suggest taking the Taste Quiz on the homepage
- Never be aggressive about collecting info — let the conversation flow naturally

BRAND VALUES: Precision roasting, single-origin sourcing from Indian estates, freshness guarantee, artisanal craft. Parent company: Aditya Food and Beverages Pvt. Ltd.`;

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
