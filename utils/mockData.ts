
import type { BusinessProfile, Review, KeywordRank, AIVisibility, Competitor, Citation, GmbQuestion } from '../types';

export const mockBusinessProfile: BusinessProfile = {
  name: 'The Daily Grind',
  type: 'Coffee Shop',
  address: '123 Main St, Sunnyvale, CA',
  rating: 4.8,
  reviewCount: 754,
  gmbUrl: '#',
  avatarUrl: 'https://picsum.photos/seed/business/100/100',
};

export const mockReviews: Review[] = [
  {
    id: 'r1',
    author: 'Alice Johnson',
    authorAvatar: 'https://picsum.photos/seed/alice/40/40',
    rating: 5,
    text: 'Absolutely the best coffee in town! The staff is incredibly friendly and the atmosphere is so cozy. Perfect place to get some work done.',
    timestamp: '2 weeks ago',
  },
  {
    id: 'r2',
    author: 'Bob Williams',
    authorAvatar: 'https://picsum.photos/seed/bob/40/40',
    rating: 4,
    text: 'Great latte and the pastries are delicious. It can get a bit crowded during peak hours, so finding a seat is sometimes a challenge.',
    timestamp: '3 weeks ago',
  },
  {
    id: 'r3',
    author: 'Charlie Brown',
    authorAvatar: 'https://picsum.photos/seed/charlie/40/40',
    rating: 3,
    text: 'The coffee is decent, but the service was a bit slow today. Waited almost 15 minutes for a simple black coffee.',
    timestamp: '1 month ago',
  },
    {
    id: 'r4',
    author: 'Diana Miller',
    authorAvatar: 'https://picsum.photos/seed/diana/40/40',
    rating: 5,
    text: 'My go-to spot! The baristas remember my order and always greet me with a smile. The seasonal drinks are a must-try.',
    timestamp: '1 month ago',
  },
];

const generateRankHistory = (start: number, trend: number) => {
  const history = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const position = Math.round(start + trend * i + (Math.random() - 0.5) * 2);
    history.push({ date: date.toLocaleDateString('en-US', { month: 'short' }), position: Math.max(1, position) });
  }
  return history;
};


export const mockKeywordRanks: KeywordRank[] = [
  {
    keyword: 'best coffee sunnyvale',
    location: 'Sunnyvale, CA',
    history: generateRankHistory(3, -0.1),
  },
  {
    keyword: 'cafe near me',
    location: 'Sunnyvale, CA',
    history: generateRankHistory(5, -0.2),
  },
  {
    keyword: 'local coffee shop',
    location: 'Sunnyvale, CA',
    history: generateRankHistory(4, 0.1),
  },
];


const generateAIVisibilityHistory = (start: number, trend: number) => {
  const history = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const score = start + trend * i + (Math.random() - 0.5) * 5;
    history.push({ date: date.toLocaleDateString('en-US', { month: 'short' }), score: Math.max(0, Math.min(100, Math.round(score))) });
  }
  return history;
}

export const mockAIVisibility: AIVisibility[] = [
    {
        topic: 'Coffee Shop Recommendations',
        history: generateAIVisibilityHistory(65, 2),
    },
    {
        topic: 'Best Places to Work Remotely',
        history: generateAIVisibilityHistory(50, 1.5),
    }
];


export const mockCompetitors: Competitor[] = [
  { name: 'Bean Scene', rating: 4.6, reviewCount: 512, category: 'Coffee Shop' },
  { name: 'Starbucks', rating: 4.2, reviewCount: 1204, category: 'Coffee Chain' },
  { name: 'Perky Pots', rating: 4.7, reviewCount: 630, category: 'Cafe & Bakery' },
];

export const mockCitations: Citation[] = [
  { name: 'Yelp', url: '#', status: 'Listed' },
  { name: 'TripAdvisor', url: '#', status: 'Listed' },
  { name: 'Foursquare', url: '#', status: 'Inconsistent' },
  { name: 'Yellow Pages', url: '#', status: 'Listed' },
  { name: 'MapQuest', url: '#', status: 'Not Found' },
];

export const mockGmbQuestions: GmbQuestion[] = [
    {
        id: 'q1',
        author: 'Frank Thomas',
        question: 'Do you guys have Wi-Fi? Is it free?',
        timestamp: '1 day ago',
    },
    {
        id: 'q2',
        author: 'Grace Hopper',
        question: 'Are there vegan milk options available like oat or soy?',
        timestamp: '4 days ago',
        answer: 'Yes! We offer oat, soy, and almond milk as dairy-free alternatives.'
    }
]
