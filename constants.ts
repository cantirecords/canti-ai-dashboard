
import { Lead, PerformanceMetric, Industry, AppSettings } from './types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Carlos Pizza',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5wXnATXsyUa7-LvLF-lX1jFuewaO6CWwZ3Df9sXUk5CjtisLkozGxzf0cOiMUcmdXkIcBSuZ9vZS7nHv-rBYegY3QoMd1ihmJVZz0wzMGCYYghwjr49zj5Cqyaj0314_b3kOa0YklqyD7drKcwN0oEUD0_v6pGiBonZ3PoKdBeZYBHT-dI4MPDlwlRv82n4SnZ0F8_cXfsqQldEvO8-UHD2ZTnXEKXRmDj2db7VCxNhMpTZj9ldQ4BRJUdYt6rP4r2Fvh_dz6ufMr',
    lastMessage: 'Is the AI bot active for the weekend?',
    status: 'Hot Lead',
    time: '09:15 AM',
    unread: true,
    platform: 'whatsapp'
  },
  {
    id: '2',
    name: 'Maria G.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr9SDDKpgK1raaX4F3IFXxgnxi5JbJLmJiwBf08W9hr-eiryl93fsBSiDuaYbhtrb2Do766qox8u70WtxQXitCD5MtEHdcAazuBO_vg7s5v8XBQGvcNt9O20fW7hxsKtuSNkqvwFfmgzmYvWcjUq2nAWNZZoioO6S3ypeH1aXpwOzTJNndTMgzZL2jL3hVWu_9yd0Sgfcy7CDq2IlNCmwuhr2_9kR8il7P1NsJcg1Eah0d7DvwiVJRPs8FJC3lsrZB6FZdBQRMeku2',
    lastMessage: 'Hola! I need a quote for the roofing...',
    status: 'Quote Requested',
    time: '10:30 AM',
    platform: 'whatsapp'
  },
  {
    id: '3',
    name: 'Unknown Lead',
    avatar: '',
    lastMessage: 'More info please.',
    status: 'New Lead',
    time: 'Yesterday',
    platform: 'whatsapp'
  }
];

export const METRICS: PerformanceMetric[] = [
  { label: 'New Leads', value: '15', change: '12%', icon: 'person_add', color: 'text-primary' },
  { label: 'Time Saved', value: '4.5h', change: '2.5h', icon: 'hourglass_empty', color: 'text-purple-400' },
  { label: 'Active Convos', value: '8', change: '3', icon: 'forum', color: 'text-orange-400' }
];

export const INITIAL_SETTINGS: AppSettings = {
  spanishEnabled: true,
  industry: Industry.CONSTRUCTION,
  faqs: [
    { question: 'Are you licensed?', answer: 'Yes, we are fully licensed and insured in the state, license #CANTI-2024.' },
    { question: 'Do you give free estimates?', answer: 'Absolutely! We can schedule a 15-minute onsite visit to provide a quote.' },
    { question: 'What is your warranty?', answer: 'We offer a 1-year labor warranty on all completed projects.' }
  ]
};
