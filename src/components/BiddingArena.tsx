import React, { useState, useEffect } from 'react';
import { Deal, MarketActivity } from '../types';
import { 
  Zap, 
  Flame, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  ArrowUpRight, 
  Award, 
  Activity, 
  Sparkles,
  ChevronRight,
  Plus,
  Sliders,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface BiddingArenaProps {
  deals: Deal[];
  activities: MarketActivity[];
  onOpenOrderModal: (deal: Deal) => void;
  searchQuery: string;
}

export const BiddingArena: React.FC<BiddingArenaProps> = ({
  deals,
  activities,
  onOpenOrderModal,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeDeals, setActiveDeals] = useState<Deal[]>(deals);
  const [quickBidAmounts, setQuickBidAmounts] = useState<{ [key: string]: number }>({});
  const [bidSuccessMessage, setBidSuccessMessage] = useState<string | null>(null);

  // Sync state when props update
  useEffect(() => {
    setActiveDeals(deals);
  }, [deals]);

  // Filter deals based on category and search query
  const filteredDeals = activeDeals.filter(deal => {
    const matchesCategory = selectedCategory === 'ALL' || deal.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredDeal = activeDeals.find(d => d.featured) || activeDeals[0];

  const handleQuickBidSubmit = (deal: Deal) => {
    const amount = quickBidAmounts[deal.id] || deal.minTicketNum;
    setBidSuccessMessage(`Bid of $${amount.toLocaleString()} submitted for ${deal.title}!`);
    setTimeout(() => setBidSuccessMessage(null), 4000);
  };

  const categories = ['ALL', 'CROWDFUND', 'SYNDICATE', 'PRE-SEED', 'SERIES A'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast Notification */}
      {bidSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3.5 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,215,0,0.5)] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-black" />
          <span>{bidSuccessMessage}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#120b24] via-[#1a0e38] to-[#0a0a0f] border border-purple-500/30 p-6 lg:p-10 shadow-[0_0_50px_rgba(189,0,255,0.15)]">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#bd00ff]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-[#ff4f73]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              HIGH-STAKES CROWD BIDDING ARENA
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none font-['Inter']">
              BATTLE FOR <br />
              <span className="gold-gradient-text">EARLY ALLOCATIONS</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Bid in real-time alongside venture syndicates, institutional whales, and sovereign rebels.
              Fair-price discovery for hyper-growth technology ventures.
            </p>

            {/* Arena Stats Ribbon */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase font-mono">24H BID VOLUME</div>
                <div className="text-lg font-black font-mono text-amber-300">$18,450,200</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase font-mono">LIVE BIDDERS</div>
                <div className="text-lg font-black font-mono text-emerald-400">4,892</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[10px] text-gray-400 uppercase font-mono">SUCCESS RATE</div>
                <div className="text-lg font-black font-mono text-purple-300">94.8%</div>
              </div>
            </div>
          </div>

          {/* Featured Spotlight Card inside Hero */}
          <div className="lg:col-span-5">
            {featuredDeal && (
              <div className="relative rounded-2xl bg-[#161226]/90 border border-amber-400/50 p-5 shadow-2xl gold-border-glow overflow-hidden group">
                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  SPOTLIGHT ARENA
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={featuredDeal.imageUrl} 
                    alt={featuredDeal.title}
                    className="w-16 h-16 rounded-xl object-cover border border-amber-400/30"
                  />
                  <div>
                    <h3 className="text-lg font-black text-white">{featuredDeal.title}</h3>
                    <p className="text-xs text-amber-300/80 line-clamp-1">{featuredDeal.tagline}</p>
                    <div className="text-[11px] font-mono text-gray-400 mt-1">
                      Lead: <strong className="text-white">{featuredDeal.leadInvestor}</strong>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Raised: ${(featuredDeal.totalFunded / 1000000).toFixed(2)}M</span>
                    <span className="text-amber-300 font-bold">
                      {Math.round((featuredDeal.totalFunded / featuredDeal.fundTarget) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-purple-500 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_10px_#ffd700]"
                      style={{ width: `${Math.min(100, (featuredDeal.totalFunded / featuredDeal.fundTarget) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div>
                    <div className="text-[10px] text-gray-400 font-mono">CURRENT TOP BID</div>
                    <div className="text-xl font-black font-mono text-white">${featuredDeal.currentBidPerShare}/share</div>
                  </div>

                  <button
                    onClick={() => onOpenOrderModal(featuredDeal)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,215,0,0.4)] transition hover:scale-[1.03] flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-black text-black" />
                    <span>ENTER BID ARENA</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Category Filter & Live Ticker Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] p-3 rounded-2xl border border-white/10">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-purple-400 ml-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#bd00ff] text-white shadow-[0_0_15px_#bd00ff]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Ticker info */}
        <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE AUCTION MODE
          </span>
          <span className="text-gray-500">|</span>
          <span>Matching Engine: <strong className="text-white">Sub-ms Priority</strong></span>
        </div>

      </div>

      {/* Deals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => {
          const currentBid = quickBidAmounts[deal.id] || deal.minTicketNum;
          const fundPct = Math.min(100, Math.round((deal.totalFunded / deal.fundTarget) * 100));

          return (
            <div
              key={deal.id}
              className="relative rounded-2xl bg-[#110f1c] border border-white/10 hover:border-purple-500/50 transition-all duration-300 p-5 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(189,0,255,0.2)] overflow-hidden"
            >
              {/* Card Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-black font-mono border border-purple-500/30 uppercase tracking-wider">
                  {deal.category}
                </span>
                <span className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {Math.floor(deal.timeLeftSeconds / 3600)}h {Math.floor((deal.timeLeftSeconds % 3600) / 60)}m
                </span>
              </div>

              {/* Deal Image & Headings */}
              <div className="space-y-3 mb-4">
                <div className="relative h-36 rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src={deal.imageUrl} 
                    alt={deal.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110f1c] via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-mono bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="text-gray-400">TRACTION:</span>
                    <span className="text-emerald-400 font-bold">{deal.tractionMetric}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {deal.tagline}
                  </p>
                </div>
              </div>

              {/* Key Deal Metrics */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs mb-4">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">VALUATION</div>
                  <div className="font-bold text-white mt-0.5">{deal.valuation}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">MIN TICKET</div>
                  <div className="font-bold text-amber-300 mt-0.5">{deal.minTicket}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">PARTICIPANTS</div>
                  <div className="font-bold text-gray-300 mt-0.5">{deal.participantsCount} Rebels</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">REBEL SCORE</div>
                  <div className="font-bold text-purple-400 mt-0.5">{deal.rebelScore}/100</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-gray-400">${(deal.totalFunded / 1000000).toFixed(2)}M raised</span>
                  <span className="text-purple-300 font-bold">{fundPct}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 rounded-full"
                    style={{ width: `${fundPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Bid Controls */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-mono text-gray-400">QUICK TICKET:</div>
                  <div className="flex items-center gap-1">
                    {[100, 500, 1000, 2500].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setQuickBidAmounts({ ...quickBidAmounts, [deal.id]: amt })}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded border transition ${
                          currentBid === amt
                            ? 'bg-amber-400 text-black border-amber-400 font-bold'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickBidSubmit(deal)}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-[0_0_15px_rgba(189,0,255,0.3)]"
                  >
                    BID ${currentBid.toLocaleString()}
                  </button>
                  <button
                    onClick={() => onOpenOrderModal(deal)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-xs font-mono uppercase tracking-wider transition flex items-center justify-center gap-1"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Live Market Activity Ticker Stream */}
      <div className="rounded-2xl bg-[#0f0d1a] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-base font-extrabold text-white font-mono uppercase tracking-wider">
              REBEL ARENA LIVE STREAM
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">Real-time WebSocket Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((act) => (
            <div key={act.id} className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 font-mono">{act.user}</span>
                <span className="text-[10px] text-gray-500 font-mono">{act.timeAgo}</span>
              </div>
              <div className="text-xs text-gray-300 font-medium">{act.action} on <span className="text-white font-bold">{act.target}</span></div>
              <div className="text-xs font-mono text-emerald-400 font-bold">{act.amount}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
