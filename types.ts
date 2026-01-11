
export interface Message {
  id: string;
  sender: 'user' | 'ai' | 'customer';
  text: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface Lead {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  status: 'Hot Lead' | 'Quote Requested' | 'New Lead';
  time: string;
  unread?: boolean;
  platform: 'whatsapp' | 'messenger' | 'instagram';
}

export interface PerformanceMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

export enum Industry {
  CONSTRUCTION = 'Construction & Contracting',
  LANDSCAPING = 'Landscaping & Gardening',
  CLEANING = 'Residential Cleaning',
  RESTAURANT = 'Food Service & Catering'
}

export interface AppSettings {
  spanishEnabled: boolean;
  industry: Industry;
  faqs: Array<{ question: string; answer: string }>;
}
