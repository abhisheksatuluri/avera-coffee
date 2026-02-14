export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin: string;
  image: string;
  tastingNotes: string[];
  isSubscriptionAvailable: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface NavItem {
  label: string;
  path: string;
}