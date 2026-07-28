import React, { useState } from 'react';
import { Deal } from '../types';
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  X, 
  Building2, 
  Lock, 
  Sparkles,
  DollarSign
} from 'lucide-react';

interface OrderModalProps {
  deal: Deal | null;
  onClose: () => void;
  onConfirmBid: (dealId: string, amount: number, perSharePrice: number) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  deal,
  onClose,
  onConfirmBid
}) => {
  if (!deal) return null;

  const [ticketAmount, setTicketAmount] = useState<number>(deal.minTicketNum * 5);
  const [sharePrice, setSharePrice] = useState<number>(deal.currentBidPerShare || 42.50);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const calculatedShares = Math.floor(ticketAmount / (sharePrice || 1));
  const proRataOwnership = ((ticketAmount / deal.valuationNum) * 100).toFixed(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmBid(deal.id, ticketAmount, sharePrice);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#120f24] border border-amber-400/50 rounded-3xl p-6 lg:p-8 max-w-xl w-full space-y-6 shadow-2xl gold-border-glow relative my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            LIVE ARENA BIDDING TICKET
          </div>
          <h2 className="text-2xl font-black text-white font-['Inter']">{deal.title}</h2>
          <p className="text-xs text-amber-200/80">{deal.tagline}</p>
        </div>

        {/* Deal Quick Highlights Box */}
        <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
          <div>
            <div className="text-[10px] text-gray-500 uppercase">VALUATION</div>
            <div className="text-white font-bold">{deal.valuation}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase">MIN ENTRY</div>
            <div className="text-amber-300 font-bold">{deal.minTicket}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase">REBEL SCORE</div>
            <div className="text-purple-400 font-bold">{deal.rebelScore}/100</div>
          </div>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Ticket Capital Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <label className="text-gray-300 font-bold">ALLOCATION TICKET AMOUNT ($)</label>
              <span className="text-amber-300 font-extrabold text-sm">${ticketAmount.toLocaleString()}</span>
            </div>

            <input 
              type="number"
              min={deal.minTicketNum}
              max={1000000}
              step={100}
              value={ticketAmount}
              onChange={(e) => setTicketAmount(Number(e.target.value))}
              className="w-full bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-base text-white font-mono focus:outline-none focus:border-amber-400"
            />

            {/* Quick Increment Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {[deal.minTicketNum, 1000, 5000, 25000, 50000].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setTicketAmount(amt)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    ticketAmount === amt
                      ? 'bg-amber-400 text-black font-extrabold'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  ${amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>
          </div>

          {/* Share Price Bid Target */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <label className="text-gray-300 font-bold">BID PRICE PER SHARE ($)</label>
              <span className="text-gray-400">Current Top Bid: ${deal.currentBidPerShare?.toFixed(2) || '42.50'}</span>
            </div>
            <input 
              type="number"
              step="0.10"
              value={sharePrice}
              onChange={(e) => setSharePrice(Number(e.target.value))}
              className="w-full bg-black/70 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Pro-Rata Ownership & Shares Breakdown */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-gray-300">
              <span>ESTIMATED SHARE ALLOCATION:</span>
              <span className="text-white font-bold">{calculatedShares.toLocaleString()} SHARES</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>PRO-RATA SYNDICATE STAKE:</span>
              <span className="text-amber-300 font-bold">{proRataOwnership}%</span>
            </div>
            <div className="flex justify-between text-gray-300 pt-2 border-t border-purple-500/20">
              <span>CUSTODY & ESCROW:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> REBEL SMART ESCROW
              </span>
            </div>
          </div>

          {/* Agreement checkbox */}
          <div className="flex items-center gap-2 text-xs text-gray-300 font-sans">
            <input 
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded bg-black border-white/20 text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
            <label htmlFor="terms" className="cursor-pointer">
              I agree to the Digital Rebel Syndicate terms, non-custodial escrow, and instant liquidity protocol.
            </label>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={!agreeTerms || isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-black font-extrabold text-sm font-mono uppercase tracking-widest shadow-[0_0_25px_rgba(255,215,0,0.5)] transition hover:scale-[1.01]"
          >
            {isSubmitting ? 'PROCESSING ARENA BID...' : `CONFIRM ARENA BID ($${ticketAmount.toLocaleString()})`}
          </button>

        </form>

      </div>
    </div>
  );
};
