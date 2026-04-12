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

export interface QuizOption {
  label: string;
  icon: string;
  value: string;
}

export interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  [stepId: string]: string;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  recommendedBlend?: string;
  quizAnswers?: QuizAnswer;
  source: 'quiz' | 'contact' | 'chatbot' | 'subscription';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}