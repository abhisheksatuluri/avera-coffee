import { Product, Testimonial, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', path: '/shop' },
  { label: 'Our Craft', path: '/about' },
  { label: 'Subscription', path: '/subscription' },
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
