import React, { useState } from 'react';
import { PortfolioInvestment } from '../types';
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  Zap, 
  Layers, 
  ExternalLink,
  CheckCircle2,
  Lock,
  Flame
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface VenturePortfolioProps {
  portfolio: PortfolioInvestment[];
}

export const VenturePortfolio: React.FC<VenturePortfolioProps> = ({ portfolio }) => {
  const { formatCurrency } = useCurrency();
  const [selectedHolding, setSelectedHolding] = useState<PortfolioInvestment | null>(null);
  const [cashoutSuccessMsg, setCashoutSuccessMsg] = useState<string | null>(null);

  const totalInvested = portfolio.reduce((sum, item) => sum + item.investedAmount, 0);
  const currentValueSum = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalUnrealizedProfit = currentValueSum - totalInvested;
  const overallMultiple = (currentValueSum / (totalInvested || 1)).toFixed(2);
  const overallReturnPct = Math.round(((currentValueSum - totalInvested) / (totalInvested || 1)) * 100);

  const handleCashoutSecondary = (holding: PortfolioInvestment) => {
    setCashoutSuccessMsg(`Liquidity request initiated for ${holding.companyName}. Realized value: ${formatCurrency(holding.currentValue)}`);
    setSelectedHolding(null);
    setTimeout(() => setCashoutSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast */}
      {cashoutSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3.5 rounded-2xl font-bold shadow-[0_0_30px_rgba(255,215,0,0.5)] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-black" />
          <span>{cashoutSuccessMsg}</span>
        </div>
      )}

      {/* Portfolio Overview Scoreboard */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c120c] via-[#2a170d] to-[#0a0a0f] border border-amber-500/40 p-6 lg:p-8 shadow-[0_0_50px_rgba(255,180,0,0.15)]">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono">
              <Award className="w-4 h-4 text-amber-400" />
              REBEL VENTURE VAULT
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              PORTFOLIO NAV: <span className="gold-gradient-text">{formatCurrency(currentValueSum)}</span>
            </h1>

            <p className="text-gray-300 text-sm">
              Real-time mark-to-market valuation across syndicated deals, crowdfund allocations, and early-stage rebel positions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                TOTAL GAIN: +{formatCurrency(totalUnrealizedProfit)} (+{overallReturnPct}%)
              </span>
              <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                MOIC: {overallMultiple}x
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/10 p-4 rounded-2xl font-mono space-y-1">
              <div className="text-gray-400 text-[10px]">TOTAL CAPITAL DEPLOYED</div>
              <div className="text-xl font-bold text-white">{formatCurrency(totalInvested)}</div>
              <div className="text-[10px] text-gray-500">4 Active Positions</div>
            </div>
            <div className="bg-black/40 border border-white/10 p-4 rounded-2xl font-mono space-y-1">
              <div className="text-gray-400 text-[10px]">SECONDARY LIQUIDITY</div>
              <div className="text-xl font-bold text-amber-300">AVAILABLE</div>
              <div className="text-[10px] text-emerald-400">Instant Tradeable</div>
            </div>
          </div>

        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            ACTIVE VENTURE HOLDINGS ({portfolio.length})
          </h3>
          <span className="text-xs font-mono text-gray-400">Auto-valued via Latest Syndicate Rounds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.map((holding) => (
            <div
              key={holding.id}
              className="relative rounded-2xl bg-[#120e21] border border-white/10 hover:border-amber-400/50 transition-all duration-300 p-6 space-y-5 shadow-xl group hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]"
            >
              {/* Card Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={holding.logo} 
                    alt={holding.companyName}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {holding.companyName}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      Ticker: <strong className="text-white">{holding.ticker}</strong> • {holding.round}
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-500/20 text-emerald-300 font-mono text-xs font-black px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {holding.unrealizedReturnMultiple}x MOIC
                </span>
              </div>

              {/* Holding Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-gray-500">INVESTED</div>
                  <div className="text-white font-bold">{formatCurrency(holding.investedAmount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">CURRENT VALUE</div>
                  <div className="text-amber-300 font-bold">{formatCurrency(holding.currentValue)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">PRO-RATA STAKE</div>
                  <div className="text-purple-300 font-bold">{holding.myStake}</div>
                </div>
              </div>

              {/* Performance Growth */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">Monthly Growth: <strong className="text-emerald-400">{holding.monthlyGrowth}</strong></span>
                <span className="text-gray-400">Allocated: <strong className="text-gray-300">{holding.allocationDate}</strong></span>
              </div>

              {/* Secondary Market Trading Button */}
              <div className="pt-2 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => setSelectedHolding(holding)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider transition shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>SELL / SECONDARY LIQUIDITY</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Secondary Liquidity Modal */}
      {selectedHolding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#18122c] border border-amber-400/50 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Secondary Liquidity: {selectedHolding.companyName}
              </h3>
              <button 
                onClick={() => setSelectedHolding(null)}
                className="text-gray-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>TOTAL SHARES VALUE:</span>
                <span className="text-amber-300 font-bold">{formatCurrency(selectedHolding.currentValue)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>ORIGINAL COST BASIS:</span>
                <span className="text-white font-bold">{formatCurrency(selectedHolding.investedAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>ESTIMATED LIQUID PROFIT:</span>
                <span className="text-emerald-400 font-bold">+{formatCurrency(selectedHolding.currentValue - selectedHolding.investedAmount)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Requesting secondary cashout matches your equity stake with incoming syndicate buy orders in the terminal.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedHolding(null)}
                className="w-1/2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono font-bold"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => handleCashoutSecondary(selectedHolding)}
                className="w-1/2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-extrabold uppercase shadow-[0_0_20px_rgba(255,215,0,0.4)]"
              >
                CONFIRM CASHOUT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
