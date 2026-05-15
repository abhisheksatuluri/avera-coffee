import { Product, Testimonial, NavItem, QuizStep } from './types';

export const WHATSAPP_NUMBER = '919087434124';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', path: '/shop' },
  { label: 'Our Craft', path: '/about' },
  { label: 'Brew Guide', path: '/brew-guide' },
  { label: 'The Club', path: '/subscription' },
  { label: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Arabica Washed',
    price: 22,
    mrp: 28,
    description: 'Stripped to its purest expression. Our washed Arabica undergoes meticulous wet processing that removes every trace of fruit, leaving only the bean\'s true character. Crystalline, precise, unapologetic. This is coffee with nothing to hide.',
    roastLevel: 'Medium',
    origin: 'Chikmagalur, India',
    image: '/Arabica Washed.webp',
    tastingNotes: ['Citrus', 'Brown Sugar', 'Clean Finish'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 2, body: 2, acidity: 4, bitterness: 1 },
    altitude: '1,100 to 1,400m',
    variety: 'Arabica S795',
    processing: 'Washed',
  },
  {
    id: '2',
    name: 'Arabica Natural',
    price: 22,
    mrp: 28,
    description: 'The whole cherry dries slowly under the Indian sun, and the bean drinks in every last drop of sweetness. The result is intoxicating. Wild berry, dark wine, a finish that lingers long after the cup is empty. For those who believe restraint is overrated.',
    roastLevel: 'Medium-Dark',
    origin: 'Araku Valley, India',
    image: '/Arabica Natural.webp',
    tastingNotes: ['Blueberry', 'Dark Wine', 'Chocolate'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 4, body: 4, acidity: 2, bitterness: 2 },
    altitude: '900 to 1,100m',
    variety: 'Arabica S795',
    processing: 'Natural (Dry)',
  },
  {
    id: '3',
    name: 'Fine Robusta',
    price: 22,
    mrp: 28,
    description: 'Forget everything you think you know about Robusta. Grown at elevation in Chikmagalur and processed with the precision of specialty Arabica, this is a full-bodied revelation. Twice the caffeine, zero compromise. Bold enough to stand alone. Strong enough to anchor any milk drink.',
    roastLevel: 'Dark',
    origin: 'Chikmagalur, India',
    image: '/Fine Robusta.webp',
    tastingNotes: ['Dark Cocoa', 'Walnut', 'Smoky'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 1, body: 5, acidity: 1, bitterness: 4 },
    altitude: '800 to 1,200m',
    variety: 'Robusta CxR',
    processing: 'Washed',
  },
  {
    id: '4',
    name: 'Red Honey Sun-Dried',
    price: 22,
    mrp: 28,
    description: 'Partially stripped, then laid out on raised beds where the remaining mucilage caramelizes under controlled sun exposure. The "red" honey process walks a razor\'s edge between clean and wild, and the result is a cup with stone fruit sweetness and a syrupy body that feels almost indulgent.',
    roastLevel: 'Medium',
    origin: 'Coorg, India',
    image: '/Red Honey Sun-Dried.webp',
    tastingNotes: ['Peach', 'Caramel', 'Raw Honey'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 4, body: 3, acidity: 3, bitterness: 1 },
    altitude: '1,000 to 1,300m',
    variety: 'Arabica Selection 9',
    processing: 'Red Honey',
  },
  {
    id: '5',
    name: 'Black Honey Sun-Dried',
    price: 22,
    mrp: 28,
    description: 'The most labour-intensive process in our lineup. Nearly all the fruit mucilage stays on the bean during an extended, carefully monitored sun-drying phase. The result is dense, jammy, almost dessert-like. A cup so rich it borders on decadence. Extremely limited batches.',
    roastLevel: 'Medium-Dark',
    origin: 'Coorg, India',
    image: '/Black Honey Sun-Dried.webp',
    tastingNotes: ['Fig', 'Toffee', 'Dark Plum'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 5, body: 5, acidity: 1, bitterness: 2 },
    altitude: '1,000 to 1,300m',
    variety: 'Arabica Selection 9',
    processing: 'Black Honey',
  },
  {
    id: '6',
    name: 'Fermented Whiskey',
    price: 22,
    mrp: 28,
    description: 'Our most experimental and sought-after offering. Green beans undergo a proprietary anaerobic fermentation process inspired by whiskey barrel aging, developing deep boozy undertones without a drop of alcohol. The flavour profile is unlike anything in Indian specialty coffee. Smoky, complex, and utterly addictive. Once it\'s gone, it\'s gone.',
    roastLevel: 'Dark',
    origin: 'Estate Reserve, India',
    image: '/Fermented Whiskey.webp',
    tastingNotes: ['Oak', 'Vanilla', 'Burnt Caramel'],
    isSubscriptionAvailable: true,
    flavorProfile: { sweetness: 3, body: 5, acidity: 1, bitterness: 3 },
    altitude: '1,100 to 1,400m',
    variety: 'Arabica Blend',
    processing: 'Anaerobic Fermented',
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
  chocolate: { beginner: '1', casual: '3', enthusiast: '2', connoisseur: '6' },
  fruity:    { beginner: '4', casual: '4', enthusiast: '5', connoisseur: '2' },
  spice:     { beginner: '1', casual: '3', enthusiast: '6', connoisseur: '6' },
  caramel:   { beginner: '4', casual: '5', enthusiast: '5', connoisseur: '6' },
};

export const GEMINI_SYSTEM_PROMPT = `You are Avera's Coffee Concierge. a warm, knowledgeable guide for Avera Specialty Coffee, a premium Indian specialty coffee brand based in Hyderabad, India.

PERSONALITY & TONE:
- Sophisticated yet approachable. Think: a knowledgeable barista at a luxury cafe who genuinely loves what they do.
- Keep responses concise (2-3 sentences max unless asked for detail). Never use bullet points or markdown formatting. write naturally like a conversation.
- Never be pushy or salesy. Be genuinely helpful first. The lead capture should feel like a natural extension of good service.
- Use warm language. Say "our" and "we" when talking about Avera. You ARE Avera.

ABOUT AVERA:
- Avera Specialty Coffee is a luxury coffee brand that precision-roasts specialty beans fresh on order.
- Based in Hyderabad, India. Parent company: Aditya Food and Beverages Pvt. Ltd.
- We source directly from premium Indian estate farms. Coorg, Araku Valley, Chikmagalur.
- Every bag is roasted AFTER the customer orders (never pre-roasted stock), ensuring peak freshness.
- We offer 4 grind options: Whole Bean, Aeropress, French Press, Espresso. ground to micron-level precision.
- Delivery within 48 hours across Hyderabad and major Indian metros.
- Orders are placed directly via WhatsApp for a personal, concierge-style experience.

COMPLETE PRODUCT CATALOG:

1. ARABICA WASHED. ₹2,400
   Roast: Medium | Origin: Chikmagalur, India
   Tasting Notes: Citrus, Brown Sugar, Clean Finish
   Description: Our purest expression of Arabica. Wet-processed to strip away all fruit, leaving only the bean's true character. crystalline clarity with bright citrus up front, brown sugar sweetness in the body, and a remarkably clean finish. Ideal for pour-over and Aeropress lovers who want precision in every sip.

2. ARABICA NATURAL. ₹2,600
   Roast: Medium-Dark | Origin: Araku Valley, India
   Tasting Notes: Blueberry, Dark Wine, Chocolate
   Description: The whole cherry dries slowly under the Indian sun, and the bean absorbs every drop of sweetness. Wild berry and dark wine notes dominate, with a chocolate undertone that lingers. Full-bodied and intoxicating. for those who want their coffee expressive and unapologetic.

3. FINE ROBUSTA. ₹2,200
   Roast: Dark | Origin: Chikmagalur, India
   Tasting Notes: Dark Cocoa, Walnut, Smoky
   Description: Specialty-grade Robusta grown at elevation and processed with Arabica-level precision. Twice the caffeine with dark cocoa depth, walnut richness, and a smoky finish. Bold enough to stand alone, strong enough to anchor any milk drink. This is not your ordinary Robusta.

4. RED HONEY SUN-DRIED. ₹2,800
   Roast: Medium | Origin: Coorg, India
   Tasting Notes: Peach, Caramel, Raw Honey
   Description: Partially stripped and sun-dried on raised beds where the remaining mucilage caramelizes. Stone fruit sweetness meets a syrupy, honey-like body. The red honey process walks a razor's edge between clean and wild. and that tension is what makes every cup memorable.

5. BLACK HONEY SUN-DRIED. ₹3,000
   Roast: Medium-Dark | Origin: Coorg, India
   Tasting Notes: Fig, Toffee, Dark Plum
   Description: Our most labour-intensive process. Nearly all the fruit mucilage stays on during an extended, monitored sun-drying phase. Dense, jammy, almost dessert-like. fig and dark plum sweetness with a toffee finish. Extremely limited batches for those who appreciate the extraordinary.

6. FERMENTED WHISKEY. ₹3,400
   Roast: Dark | Origin: Estate Reserve, India
   Tasting Notes: Oak, Vanilla, Burnt Caramel
   Description: Our most experimental and sought-after offering. Green beans undergo proprietary anaerobic fermentation inspired by whiskey barrel aging, developing deep boozy undertones without a drop of alcohol. Oak, vanilla, and burnt caramel create a flavour profile unlike anything in Indian specialty coffee. Once it's gone, it's gone.

BREWING RECOMMENDATIONS (use when asked):
- Pour Over: Medium grind, 1:16 ratio, 200°F water, 3-4 min
- French Press: Coarse grind, 1:15 ratio, 200°F, steep 4 min
- Aeropress: Medium-fine grind, inverted method, 1:12 ratio
- Espresso: Fine grind, 18g in, 36g out, 25-30 seconds

LEAD CAPTURE STRATEGY:
Your secondary goal (after being helpful) is to naturally capture the visitor's contact info. Follow this flow:

1. FIRST 1-2 messages: Be purely helpful. Answer their question with genuine expertise. Build trust.
2. AFTER 2-3 exchanges: Naturally transition. Examples:
   - "By the way, I'd love to keep you posted when we release new seasonal roasts. would you like to share your name and number?"
   - "If you'd like, I can have our team reach out with a personalized recommendation. What's the best way to contact you?"
   - "We're running a first-time order offer this month. Want me to send the details to your WhatsApp?"
3. If they share info: Thank them warmly and suggest ordering via WhatsApp.
4. If they decline: No pressure at all. Continue being helpful.

OTHER CONVERSION PATHS:
- If they show purchase intent: "You can order directly on WhatsApp. just tap the WhatsApp icon in the top right. We'll have it roasted and shipped within 48 hours!"
- If they're exploring: "Have you tried our Taste Quiz? It's a fun 60-second quiz right on the homepage that matches you to your perfect Avera blend."
- If they ask about subscription/club: "We have the Avera Club. you get early access to limited roasts, exclusive lots, and member pricing. You can join on the Club page!"

THINGS YOU SHOULD NEVER DO:
- Never make up information about products, pricing, or availability
- Never discuss competitors
- Never be pushy about lead capture. one gentle ask is enough
- Never use emojis excessively (one or two is fine occasionally)
- Never give generic chatbot responses. every answer should feel personal and expert`;

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
