
export interface BusinessProfile {
  name: string;
  type: string;
  address: string;
  rating: number;
  reviewCount: number;
  gmbUrl: string;
  avatarUrl: string;
}

export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export interface Review {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  text: string;
  timestamp: string;
  sentiment?: Sentiment;
  themes?: string[];
  reply?: string;
  isGeneratingReply?: boolean;
}

export interface RankDataPoint {
  date: string;
  position: number;
}

export interface KeywordRank {
  keyword: string;
  location: string;
  history: RankDataPoint[];
}

export interface AIVisibilityDataPoint {
    date: string;
    score: number;
}

export interface AIVisibility {
    topic: string;
    history: AIVisibilityDataPoint[];
}

export interface Competitor {
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
}

export type CitationStatus = 'Listed' | 'Inconsistent' | 'Not Found';

export interface Citation {
  name: string;
  url: string;
  status: CitationStatus;
}

export interface GmbQuestion {
  id: string;
  author: string;
  question: string;
  timestamp: string;
  answer?: string;
  isGeneratingAnswer?: boolean;
}

export enum ActiveView {
  Dashboard = 'Dashboard',
  Reviews = 'Reviews',
  Posts = 'Posts',
  Analytics = 'Analytics',
  Settings = 'Settings',
}
