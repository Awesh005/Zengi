export type ActiveTab = 'arena' | 'terminal' | 'matches' | 'portfolio' | 'dealflow';

export interface Deal {
  id: string;
  title: string;
  tagline: string;
  category: 'SYNDICATE' | 'CROWDFUND' | 'PRE-SEED' | 'SERIES A' | 'MEME INITIATIVE';
  valuation: string;
  valuationNum: number;
  minTicket: string;
  leadInvestor: string;
  leadAvatar?: string;
  totalFunded: number;
  fundTarget: number;
  participantsCount: number;
  timeLeftSeconds: number;
  featured?: boolean;
  hot?: boolean;
  liveBidding?: boolean;
  minTicketNum: number;
  currentBidPerShare?: number;
  imageUrl: string;
  tractionMetric: string;
  description: string;
  rebelScore: number;
  badges: string[];
}

export interface FounderMatch {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  compatibilityScore: number; // e.g. 98
  tags: string[];
  bio: string;
  fundingStage: string;
  capitalNeeded: string;
  synergyHighlights: string[];
  location: string;
  verifiedRebel: boolean;
  superpower: string;
}

export interface PortfolioInvestment {
  id: string;
  companyName: string;
  ticker: string;
  logo: string;
  entryValuation: string;
  currentValuation: string;
  myStake: string;
  investedAmount: number;
  currentValue: number;
  unrealizedReturnMultiple: number; // e.g. 4.2x
  unrealizedReturnPct: number; // e.g. +320%
  status: 'EXPLOSIVE GROWTH' | 'PRE-IPO' | 'HIGH YIELD' | 'STABLE';
  round: string;
  allocationDate: string;
  monthlyGrowth: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  type: 'buy' | 'sell';
}

export interface MarketActivity {
  id: string;
  user: string;
  avatar: string;
  action: 'PLACED BID' | 'EXECUTED TICKET' | 'JOINED SYNDICATE' | 'MATCHED';
  target: string;
  amount: string;
  timeAgo: string;
  badge?: string;
}
