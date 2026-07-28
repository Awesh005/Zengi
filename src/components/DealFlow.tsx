import React, { useState } from 'react';
import { Deal } from '../types';
import { 
  Layers, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Clock, 
  Building2,
  TrendingUp,
  Flame,
  ChevronRight
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface DealFlowProps {
  deals: Deal[];
  onOpenOrderModal: (deal: Deal) => void;
  searchQuery: string;
}

export const DealFlow: React.FC<DealFlowProps> = ({ deals, onOpenOrderModal, searchQuery }) => {
  const { formatCurrency } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'valuation' | 'funded' | 'rebelScore'>('rebelScore');

  const filteredDeals = deals.filter(d => {
    const matchesCategory = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'valuation') return b.valuationNum - a.valuationNum;
    if (sortBy === 'funded') return b.totalFunded - a.totalFunded;
    return b.rebelScore - a.rebelScore;
  });

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c0c21] via-[#2d1136] to-[#0a0a0f] border border-rose-500/30 p-6 lg:p-8 shadow-[0_0_50px_rgba(244,63,94,0.15)]">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold font-mono">
              <Sparkles className="w-4 h-4 text-rose-400" />
              CURATED REBEL VETTING PROCESS
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              CURATED <span className="text-rose-400">DEAL FLOW</span> PIPELINE
            </h1>
            <p className="text-gray-300 text-sm max-w-2xl">
              Top 1% vetted seed, series A, and crowdfund allocations filtered through our Rebel Due Diligence engine.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/10 font-mono text-xs">
            <div>
              <div className="text-gray-400 text-[10px]">TOTAL PIPELINE TVL</div>
              <div className="text-xl font-bold text-white">{formatCurrency(171500000, { compact: true })}</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div>
              <div className="text-gray-400 text-[10px]">ACCEPTANCE RATE</div>
              <div className="text-xl font-bold text-rose-400">0.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-rose-400 ml-2" />
          {['ALL', 'CROWDFUND', 'SYNDICATE', 'PRE-SEED', 'SERIES A'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_#f43f5e]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-gray-400">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/60 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
          >
            <option value="rebelScore">Rebel AI Score (High-Low)</option>
            <option value="funded">Total Raised ($)</option>
            <option value="valuation">Valuation ($)</option>
          </select>
        </div>

      </div>

      {/* Deal Pipeline Table / Cards */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => {
          const fundPct = Math.min(100, Math.round((deal.totalFunded / deal.fundTarget) * 100));

          return (
            <div
              key={deal.id}
              className="bg-[#120e21] border border-white/10 hover:border-rose-500/50 rounded-2xl p-6 transition-all duration-300 shadow-xl group space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left image & info */}
                <div className="flex items-start gap-4">
                  <img 
                    src={deal.imageUrl} 
                    alt={deal.title}
                    className="w-20 h-20 rounded-2xl object-cover border border-white/20 group-hover:scale-105 transition duration-300"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-black border border-rose-500/30 uppercase">
                        {deal.category}
                      </span>
                      <span className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        REBEL SCORE: {deal.rebelScore}/100
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-1 max-w-xl">
                      {deal.tagline}
                    </p>
                    <div className="text-xs font-mono text-gray-400 pt-1">
                      Lead Investor: <strong className="text-white">{deal.leadInvestor}</strong>
                    </div>
                  </div>
                </div>

                {/* Center Stats */}
                <div className="grid grid-cols-3 gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">VALUATION</div>
                    <div className="font-bold text-white mt-0.5">{formatCurrency(deal.valuationNum, { compact: true })}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">MIN TICKET</div>
                    <div className="font-bold text-amber-300 mt-0.5">{formatCurrency(deal.minTicketNum, { compact: true })}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase">RAISED</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{formatCurrency(deal.totalFunded, { compact: true })}</div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenOrderModal(deal)}
                    className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-extrabold text-xs font-mono uppercase tracking-wider transition shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center gap-2"
                  >
                    <span>INVEST IN SYNDICATE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Description & Badges */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                <p className="text-gray-400 text-xs max-w-3xl">
                  {deal.description}
                </p>

                <div className="flex items-center gap-2">
                  {deal.badges.map((b, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
