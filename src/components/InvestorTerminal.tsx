import React, { useState } from 'react';
import { Deal, OrderBookEntry } from '../types';
import { 
  Terminal, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart2, 
  ShieldCheck, 
  Sliders, 
  Zap, 
  Info, 
  DollarSign, 
  RefreshCw,
  Layers,
  ChevronDown
} from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

interface InvestorTerminalProps {
  deals: Deal[];
  orderBook: OrderBookEntry[];
  onPlaceOrder: (dealId: string, amount: number, price: number, type: 'buy' | 'sell') => void;
}

export const InvestorTerminal: React.FC<InvestorTerminalProps> = ({
  deals,
  orderBook,
  onPlaceOrder
}) => {
  const { formatCurrency, formatPrice, symbol } = useCurrency();
  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [ticketAmount, setTicketAmount] = useState<number>(5000);
  const [bidPrice, setBidPrice] = useState<number>(selectedDeal.currentBidPerShare || 42.50);
  const [executionMode, setExecutionMode] = useState<'LIMIT' | 'MARKET' | 'SYNDICATE'>('LIMIT');
  const [orderExecutedMsg, setOrderExecutedMsg] = useState<string | null>(null);

  const calculatedShares = Math.floor(ticketAmount / (bidPrice || 1));

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder(selectedDeal.id, ticketAmount, bidPrice, orderType);
    setOrderExecutedMsg(`Order Submitted: ${orderType.toUpperCase()} ${formatCurrency(ticketAmount)} (${calculatedShares} Shares) @ ${formatPrice(bidPrice)}/share`);
    setTimeout(() => setOrderExecutedMsg(null), 4000);
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* Success Notification */}
      {orderExecutedMsg && (
        <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-300 p-4 rounded-2xl font-mono text-xs flex items-center justify-between shadow-[0_0_20px_rgba(52,211,153,0.3)] animate-fade-in">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>{orderExecutedMsg}</span>
          </div>
          <span className="font-bold text-white bg-emerald-600/40 px-2 py-0.5 rounded">EXECUTION SUCCESS</span>
        </div>
      )}

      {/* Terminal Top Control Bar */}
      <div className="bg-[#120e24] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Deal Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-mono">SELECTED ASSET / VENTURE</div>
            <select
              value={selectedDeal.id}
              onChange={(e) => {
                const d = deals.find(x => x.id === e.target.value);
                if (d) {
                  setSelectedDeal(d);
                  setBidPrice(d.currentBidPerShare || 42.50);
                }
              }}
              className="bg-transparent text-white font-extrabold text-base font-mono focus:outline-none cursor-pointer pr-4"
            >
              {deals.map(d => (
                <option key={d.id} value={d.id} className="bg-[#120e24] text-white">
                  {d.title} ({d.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Asset Stats */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-gray-400 block text-[10px]">VALUATION</span>
            <span className="text-white font-bold">{formatCurrency(selectedDeal.valuationNum, { compact: true })}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">BID PRICE</span>
            <span className="text-amber-300 font-bold">{formatPrice(bidPrice)}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">24H CHANGE</span>
            <span className="text-emerald-400 font-bold">+18.4%</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">MIN TICKET</span>
            <span className="text-purple-300 font-bold">{formatCurrency(selectedDeal.minTicketNum, { compact: true })}</span>
          </div>
        </div>

      </div>

      {/* Main Terminal Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns: Live Depth Chart & Orderbook */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Chart & Market Depth Box */}
          <div className="bg-[#100c21] border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  VALUATION TRAJECTORY & ORDER DEPTH
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">1D</span>
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold">1W</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">1M</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">ALL</span>
              </div>
            </div>

            {/* Simulated Depth Graphic Visualizer */}
            <div className="relative h-56 rounded-xl bg-black/50 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between text-[10px] font-mono text-gray-500 z-10">
                <span>BUY DEPTH ({formatCurrency(1400000, { compact: true })})</span>
                <span className="text-amber-300 font-bold">SPREAD: {formatPrice(0.40)}</span>
                <span>SELL DEPTH ({formatCurrency(2100000, { compact: true })})</span>
              </div>

              {/* Animated Depth SVG Chart */}
              <div className="absolute inset-0 flex items-end px-4 pb-4 opacity-80">
                <svg className="w-full h-40" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Buy Green Polygon */}
                  <defs>
                    <linearGradient id="buyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="sellGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Buy slope */}
                  <polygon points="0,150 0,60 120,70 200,90 240,110 240,150" fill="url(#buyGrad)" />
                  <path d="M 0,60 L 120,70 L 200,90 L 240,110" fill="none" stroke="#10b981" strokeWidth="2.5" />

                  {/* Midline price point */}
                  <line x1="250" y1="0" x2="250" y2="150" stroke="#ffd700" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Sell slope */}
                  <polygon points="260,150 260,105 320,80 400,45 500,20 500,150" fill="url(#sellGrad)" />
                  <path d="M 260,105 L 320,80 L 400,45 L 500,20" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="relative z-10 flex justify-between text-xs font-mono mt-auto">
                <span className="text-emerald-400 font-bold">{formatPrice(38.00)}</span>
                <span className="text-amber-300 font-extrabold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                  LAST MATCH: {formatPrice(bidPrice)}
                </span>
                <span className="text-rose-400 font-bold">{formatPrice(46.00)}</span>
              </div>
            </div>
          </div>

          {/* Orderbook Depth Table */}
          <div className="bg-[#100c21] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                LIVE ORDERBOOK LEVEL II DEPTH
              </h3>
              <span className="text-[10px] text-gray-400 font-mono">Updating live</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Asks (Sells) */}
              <div className="space-y-1">
                <div className="grid grid-cols-3 text-[10px] font-mono text-gray-500 pb-1 border-b border-white/5">
                  <span>PRICE ({symbol})</span>
                  <span className="text-right">SHARES</span>
                  <span className="text-right">TOTAL ({symbol})</span>
                </div>
                {orderBook.filter(o => o.type === 'sell').map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-xs font-mono py-1 hover:bg-rose-500/10 rounded px-1 transition">
                    <span className="text-rose-400 font-bold">{formatPrice(row.price)}</span>
                    <span className="text-right text-gray-300">{row.amount.toLocaleString()}</span>
                    <span className="text-right text-gray-400">{formatCurrency(row.total)}</span>
                  </div>
                ))}
              </div>

              {/* Bids (Buys) */}
              <div className="space-y-1">
                <div className="grid grid-cols-3 text-[10px] font-mono text-gray-500 pb-1 border-b border-white/5">
                  <span>PRICE ({symbol})</span>
                  <span className="text-right">SHARES</span>
                  <span className="text-right">TOTAL ({symbol})</span>
                </div>
                {orderBook.filter(o => o.type === 'buy').map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 text-xs font-mono py-1 hover:bg-emerald-500/10 rounded px-1 transition">
                    <span className="text-emerald-400 font-bold">{formatPrice(row.price)}</span>
                    <span className="text-right text-gray-300">{row.amount.toLocaleString()}</span>
                    <span className="text-right text-gray-400">{formatCurrency(row.total)}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Right 4 Columns: Order Ticket Execution Panel */}
        <div className="lg:col-span-4">
          <div className="bg-[#120e24] border border-amber-400/40 rounded-2xl p-6 space-y-6 shadow-2xl gold-border-glow sticky top-28">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-black font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-amber-300 text-black" />
                EXECUTION TERMINAL
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">FEES: 0.0%</span>
            </div>

            {/* Buy / Sell Mode Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/10">
              <button
                onClick={() => setOrderType('buy')}
                className={`py-2 rounded-lg font-mono text-xs font-extrabold uppercase transition ${
                  orderType === 'buy'
                    ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                BUY / BID
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={`py-2 rounded-lg font-mono text-xs font-extrabold uppercase transition ${
                  orderType === 'sell'
                    ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                SELL / ASK
              </button>
            </div>

            {/* Execution Order Type Selector */}
            <div className="flex items-center justify-around text-xs font-mono border-b border-white/10 pb-3">
              {(['LIMIT', 'MARKET', 'SYNDICATE'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExecutionMode(mode)}
                  className={`pb-1 font-bold transition ${
                    executionMode === mode
                      ? 'text-amber-300 border-b-2 border-amber-300'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Interactive Form Controls */}
            <form onSubmit={handleExecuteOrder} className="space-y-4">
              
              {/* Ticket Capital Amount Slider & Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <label className="text-gray-400">ALLOCATION TICKET ({symbol})</label>
                  <span className="text-amber-300 font-bold">{formatCurrency(ticketAmount)}</span>
                </div>
                
                <input 
                  type="number"
                  min={selectedDeal.minTicketNum}
                  max={500000}
                  step={100}
                  value={ticketAmount}
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />

                <input 
                  type="range"
                  min={selectedDeal.minTicketNum}
                  max={100000}
                  step={500}
                  value={ticketAmount}
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Share Price Target Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <label className="text-gray-400">TARGET SHARE PRICE ({symbol})</label>
                  <span className="text-gray-300">{formatPrice(bidPrice)}</span>
                </div>
                <input 
                  type="number"
                  step="0.10"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Order Summary Calculation */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>ESTIMATED SHARES:</span>
                  <span className="text-white font-bold">{calculatedShares.toLocaleString()} UNITS</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>PRO-RATA OWNERSHIP:</span>
                  <span className="text-amber-300 font-bold">
                    {((ticketAmount / selectedDeal.valuationNum) * 100).toFixed(4)}%
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 pt-1 border-t border-white/5">
                  <span>NETWORK GAS:</span>
                  <span className="text-emerald-400 font-bold">SPONSORED (FREE)</span>
                </div>
              </div>

              {/* Submit Execution Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs font-mono uppercase tracking-widest transition shadow-lg ${
                  orderType === 'buy'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                }`}
              >
                SUBMIT {orderType.toUpperCase()} TICKET ({formatCurrency(ticketAmount)})
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
