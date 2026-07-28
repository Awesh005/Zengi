import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Zap, 
  Terminal, 
  Users, 
  PieChart, 
  Search, 
  Wallet, 
  PlusCircle, 
  Flame, 
  ShieldCheck,
  ChevronDown,
  Bell,
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  walletBalance: number;
  totalTVL: number;
  activeDealsCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreateModal: () => void;
}

import { useCurrency } from '../context/CurrencyContext';
import { CurrencySwitcher } from './CurrencySwitcher';

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
  totalTVL,
  activeDealsCount,
  searchQuery,
  setSearchQuery,
  onOpenCreateModal
}) => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const { formatCurrency, formatPrice, currency } = useCurrency();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-[#bd00ff]/20 via-[#ff4f73]/20 to-[#ffd700]/20 border-b border-white/5 py-1 px-4 text-xs font-mono text-gray-300 flex justify-between items-center overflow-x-auto">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            LIVE ARENA TICKER
          </span>
          <span className="text-gray-400">NLZ Bidding: <strong className="text-white">{formatPrice(42.50)} (+14.2%)</strong></span>
          <span className="text-gray-400">QSX Syndicate: <strong className="text-emerald-400">89% Funded</strong></span>
          <span className="text-gray-400">HMC Yield: <strong className="text-purple-300">18.4% APY</strong></span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs text-gray-400">
          <span>TVL: <strong className="text-white">{formatCurrency(totalTVL, { compact: true })}</strong></span>
          <span>Active Bids: <strong className="text-white">{activeDealsCount} Deals</strong></span>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
            DIGITAL REBEL TIER I
          </span>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6 cursor-pointer" onClick={() => setActiveTab('arena')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#bd00ff] via-[#ff4f73] to-[#ffd700] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0d0d15] px-4 py-2 rounded-xl border border-white/20 flex items-center gap-3">
                <span className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-amber-500 font-['JetBrains_Mono']">
                  ZENGI
                </span>
                <span className="bg-[#bd00ff] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-tighter uppercase shadow-[0_0_10px_#bd00ff]">
                  REBEL
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('arena')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'arena'
                  ? 'bg-gradient-to-r from-[#bd00ff] to-[#8000ff] text-white shadow-[0_0_20px_rgba(189,0,255,0.4)] border border-purple-300/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === 'arena' ? 'text-amber-300 animate-bounce' : ''}`} />
              <span>Bidding Arena</span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-400/30">
                LIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'terminal'
                  ? 'bg-gradient-to-r from-[#bd00ff] to-[#8000ff] text-white shadow-[0_0_20px_rgba(189,0,255,0.4)] border border-purple-300/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Investor Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'matches'
                  ? 'bg-gradient-to-r from-[#bd00ff] to-[#8000ff] text-white shadow-[0_0_20px_rgba(189,0,255,0.4)] border border-purple-300/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Match Network</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'portfolio'
                  ? 'bg-gradient-to-r from-[#bd00ff] to-[#8000ff] text-white shadow-[0_0_20px_rgba(189,0,255,0.4)] border border-purple-300/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('dealflow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'dealflow'
                  ? 'bg-gradient-to-r from-[#bd00ff] to-[#8000ff] text-white shadow-[0_0_20px_rgba(189,0,255,0.4)] border border-purple-300/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4 text-rose-400" />
              <span>Deal Flow</span>
            </button>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden xl:block w-48">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Create Syndicate Button */}
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(255,180,0,0.3)] hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Syndicate</span>
            </button>

            {/* Currency Switcher Widget (USD $ <-> INR ₹) */}
            <CurrencySwitcher />

            {/* Wallet Balance Widget */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-inner">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">REBEL BALANCE</div>
                <div className="text-xs font-bold font-mono text-amber-300">
                  {formatCurrency(walletBalance, { precision: currency === 'INR' ? 0 : 2 })}
                </div>
              </div>
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>

              {showNotificationMenu && (
                <div className="absolute right-0 mt-3 w-80 bg-[#12111c] border border-white/15 rounded-2xl shadow-2xl p-4 text-xs z-50 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      Live Rebel Alerts
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">3 Unread</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                      <div className="text-amber-300 font-bold">New Bid Outbid Alert</div>
                      <div className="text-gray-300 text-[11px] mt-0.5">A whale placed $50k bid on Neural-Link Zero at $42.50.</div>
                      <div className="text-[9px] text-gray-500 mt-1 font-mono">1 min ago</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                      <div className="text-emerald-300 font-bold">Syndicate Funded 100%</div>
                      <div className="text-gray-300 text-[11px]">Quantum Shield X syndicate closed ahead of target.</div>
                      <div className="text-[9px] text-gray-500 mt-1 font-mono">14 mins ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-white/10 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('arena')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'arena' ? 'bg-[#bd00ff] text-white font-bold' : 'text-gray-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Arena
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'terminal' ? 'bg-[#bd00ff] text-white font-bold' : 'text-gray-400'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-300" /> Terminal
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'matches' ? 'bg-[#bd00ff] text-white font-bold' : 'text-gray-400'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-300" /> Matches
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'portfolio' ? 'bg-[#bd00ff] text-white font-bold' : 'text-gray-400'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-amber-300" /> Portfolio
          </button>
          <button
            onClick={() => setActiveTab('dealflow')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium ${
              activeTab === 'dealflow' ? 'bg-[#bd00ff] text-white font-bold' : 'text-gray-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-rose-300" /> Deal Flow
          </button>
        </div>

      </div>
    </header>
  );
};
